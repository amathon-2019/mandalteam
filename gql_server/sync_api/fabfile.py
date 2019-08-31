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
    local(('docker run --rm -v "$PWD":/var/task -v "$PWD/layer/mandalart_sync":/opt lambci/lambda:build-python3.6 '
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


def deploy(stage=DEFAULT_STAGE, packaging=False,):
    """
    deploy the service with the target stage
    :param force: if true, deploy forcibly (default: false)
    :param stage: target stage
    :param create_domain: if true, create domain (default: false)
    :param packaging: if true, packaging requirements and making a layer (default: false)
    :param migration: if true, run migration command after deploying (default: true)
    :return:
    """
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

    else:
        print("제정신일때 배포하세요")


def _get_env(stage):
    return f"STAGE={stage} AWS_DEFAULT_PROFILE=amathon"

