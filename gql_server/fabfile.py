import json
import os
import random

import boto3
from fabric.api import local, prefix, prompt
from fabric.contrib.console import confirm

DEFAULT_STAGE = 'dev'
STAGES = [DEFAULT_STAGE, 'test', 'prod']
VENV = ".venv"
FUNCTIONS = ["backend",  ]


def _install_packages():
    local("rm -rf layer/*", capture=True)
    local(('docker run --rm -v "$PWD":/var/task -v "$PWD/layer/mandalart":/opt lambci/lambda:build-python3.6 '
           'python3.6 -m pip install -t /opt -r /var/task/requirements.txt'))


def _strtobool(val):
    val = str(val).lower()
    if val in ('y', 'yes', 't', 'true', 'True', 'TRUE', 'T', 'on', '1'):
        return True
    elif val in ('n', 'no', 'f', 'false', 'False', 'FALSE', 'F', 'off', '0'):
        return False
    else:
        raise ValueError("invalid truth value %r" % (val,))


def _update_function(stage):
    with prefix(f". {VENV}/bin/activate"):
        for f in FUNCTIONS:
            local(f"SLS_DEBUG=* serverless deploy -s {stage} -f {f} --verbose")


def _update(stage):
    with prefix(f". {VENV}/bin/activate"):
        local(f"SLS_DEBUG=* serverless deploy -s {stage} --verbose")


def _sanity_check():
    a = random.randint(1, 9)
    b = random.randint(1, 9)
    result = prompt(f'서비스에 영향이 없다는 것을 확신하나요? \n  {a} + {b} = ?')

    if not (int(result) == a + b):
        print("문제를 틀렸습니다.")
        return False

    return True


def deploy(stage=DEFAULT_STAGE, packaging=False, migration=True):
    """
    deploy the service with the target stage
    :param force: if true, deploy forcibly (default: false)
    :param stage: target stage
    :param create_domain: if true, create domain (default: false)
    :param packaging: if true, packaging requirements and making a layer (default: false)
    :param migration: if true, run migration command after deploying (default: true)
    :return:
    """
    migration = _strtobool(migration)
    packaging = _strtobool(packaging)

    if stage not in STAGES:
        print(f"배포가 불가능한 stage입니다. {stage}는 {STAGES}에 속하지 않습니다")
        return

    if not confirm(f"{stage} 스테이지에 배포를 하는게 맞습니까?"):
        return

    # 할일: 테스트 코드 추가
    if _sanity_check():
        if packaging:
            _install_packages()
            _update(stage)
        else:
            _update_function(stage)
        if migration:
            migrate(stage)

    else:
        print("제정신일때 배포하세요")


def _get_env(stage):
    return f"STAGE={stage} AWS_DEFAULT_PROFILE=brgg"


def migrate(stage=DEFAULT_STAGE, init=False):
    """
    migrate models
    :param stage: target stage
    :return:
    """
    env = _get_env(stage)
    # 커스텀 사용자 구현으로 인해 base를 먼저 마이그레이션 해야함
    with prefix(f". {VENV}/bin/activate"):
        if init:
            local(f'{env} python manage.py migrate base')
            local(f'{env} python manage.py migrate')
            local(f'{env} python manage.py migrate base')
        else:
            local(f'{env} python manage.py migrate')


def local_migrate(stage=DEFAULT_STAGE, app_name=None):
    """
    run django's migrate command
    :param stage: target stage
    :return:
    """
    env = _get_env(stage)
    with prefix(f". {VENV}/bin/activate"):
        if app_name:
            local(f"{env} python manage.py migrate {app_name}", capture=True)
        else:
            local(f"{env} python manage.py migrate", capture=True)


def collectstatic(stage=DEFAULT_STAGE):
    """
    run django's collectstatic command
    :param stage: target stage
    :return:
    """
    env = _get_env(stage)
    with prefix(f". {VENV}/bin/activate"):
        local(f'{env} python manage.py collectstatic --noinput')


def create_superuser(stage=DEFAULT_STAGE):
    """
    run django's createsuperuser command
    :param stage: target stage
    :return:
    """
    env = _get_env(stage)
    with prefix(f". {VENV}/bin/activate"):
        local(f'{env} python manage.py createsuperuser')


def shell(stage=DEFAULT_STAGE, sql=True):
    """
    run django's shell command
    :param stage: target stage
    :param sql: if true, show sql
    :return:
    """
    env = _get_env(stage)
    with prefix(f". {VENV}/bin/activate"):
        if stage == 'prod':
            local(f'{env} python manage.py shell')
        else:
            local(f'{env} python manage.py shell_plus {"--print-sql" if sql else ""}')
