import ast
import logging
import os
from typing import Dict

import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

STAGE = os.getenv('STAGE', 'local')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

secret_manager_objects = {
    'db': f'mandalart/{STAGE}/database',
    'secret_key': "mandalart/secret_key",
}

parameter_store_objects = {
    's3_bucket_name': f'/mandalart/{STAGE}/s3_bucket_name',
    'chart_ddb_name': f'/mandalart/{STAGE}/chart_db',
}


def get_secret_by_path(name):
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name="ap-northeast-2",
        endpoint_url="https://secretsmanager.ap-northeast-2.amazonaws.com"
    )

    try:
        get_secret_value_response = client.get_secret_value(SecretId=name)
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print("The requested secret " + name + " was not found")
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            print("The request was invalid due to:", e)
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            print("The request had invalid params:", e)
    else:
        # Decrypted secret using the associated KMS CMK
        # Depending on whether the secret was a string or binary, one of these fields will be populated
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
            return ast.literal_eval(secret)
        else:
            binary_secret_data = get_secret_value_response['SecretBinary']
            return binary_secret_data


def find_parameter(list, name):
    try:
        value = [parameter_object['Value'] for parameter_object in list if parameter_object['Name'] == name][0]
    except IndexError:
        logger.error(f'{name}에 해당하는 파라미터값을 찾을수 없습니다')
        return None
    return value


def get_parameter(configs: Dict[str, str], path: str, recursive: bool = False):
    """
    AWS ssm의 파라미터 스토어에서 요청한
    :param configs: 파라미터 이름 목록  example: {'s3_bucket_name': f'/mandalart/{STAGE}/s3_bucket_name'}
    :param path: 요청할 파라미터 이름 경로
    :param recursive: 단일 path만 요청할지 path가 포함된 모든 파라미터를 요청할지 여부
    :return:
    """
    session = boto3.session.Session()
    ssm = session.client('ssm')
    parameters = ssm.get_parameters_by_path(Path=path, Recursive=recursive)['Parameters']
    config = {}
    try:
        for key, value in configs.items():
            config[key] = find_parameter(parameters, value)
    except Exception as e:
        print(e)
        return {}
    return config


def get_config(stage):
    debug = False if stage == 'prod' else True

    if stage == "local":
        from configparser import RawConfigParser

        config_local = RawConfigParser()
        config_local.read(os.path.join(BASE_DIR, 'mandalart', 'settings-local.ini'), encoding='utf-8')

        conf_info = {
            'debug': debug,
            'secret_key': {
                'secret_key': config_local.get('base', 'SECRET_KEY'),
            },
            'db': {
                'dbInstanceIdentifier': 'startbtn-db',
                'dbname': config_local.get('db', 'NAME'),
                'host': config_local.get('db', 'HOST'),
                'password': config_local.get('db', 'PASSWORD'),
                'port': config_local.get('db', 'PORT'),
                'username': config_local.get('db', 'USER'),
            },
            'aws': {
                's3': {
                    'bucket_name': config_local.get('AWS', 'STORAGE_BUCKET_NAME'),
                    'ddb_name': config_local.get('AWS', 'CHART_DDB_NAME'),
                },
            },
        }
    else:
        parameter = get_parameter(parameter_store_objects, f"/mandalart/{STAGE}")
        conf_info = {
            'debug': debug,
            'db': get_secret_by_path(secret_manager_objects['db']),
            'secret_key': get_secret_by_path(secret_manager_objects['secret_key']),
            'aws': {
                's3': {
                    'bucket_name': parameter.get('s3_bucket_name'),
                    'ddb_name': parameter.get('chart_ddb_name'),
                },
            },
        }
    return conf_info


conf_info = get_config(STAGE)
