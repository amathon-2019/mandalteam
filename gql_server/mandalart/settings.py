"""
Django settings for mandalart project.

Generated by 'django-admin startproject' using Django 2.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

from .config import BASE_DIR, STAGE, conf_info

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = conf_info['secret_key'].get('secret_key')
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = conf_info['debug']
ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'storages',
    'corsheaders',
    'graphene_django',

    'base',
    'chart'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

AUTH_USER_MODEL = "base.User"
ROOT_URLCONF = 'mandalart.urls'
if STAGE in ['dev', 'local', 'test']:
    ALLOWED_HOSTS += ['127.0.0.1']
    # 디버깅 툴바 추가
    INSTALLED_APPS += [
        'debug_toolbar',
        'django_extensions',
        'debug_panel',
    ]
    MIDDLEWARE += [
        # 'debug_toolbar.middleware.DebugToolbarMiddleware',
        # 'debug_panel.middleware.DebugPanelMiddleware',
        'mandalart.middleware.DebugPanelMiddlewareFixed',
    ]

    INTERNAL_IPS = ('115.89.233.194',)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mandalart.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': "django.db.backends.postgresql",
        'NAME': conf_info['db']['dbname'],
        'USER': conf_info['db']['username'],
        'PASSWORD': conf_info['db']['password'],
        'HOST': conf_info['db']['host'],
        'PORT': conf_info['db']['port'],
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# TODO: 수정
GRAPHENE = {
    'SCHEMA': 'mysite.myschema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'ko-KR'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

GRAPHENE = {
    'SCHEMA': 'mandalart.schema.schema',
    "DEFAULT_MAX_LIMIT": 20,
    "RELAY_CONNECTION_ENFORCE_FIRST_OR_LAST": True,
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}
GRAPHQL_JWT = {
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_ISSUER': f'mandalart.backend.{STAGE}',
    'JWT_LONG_RUNNING_REFRESH_TOKEN': True,
}
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/


TEMPLATES_DIRS = (os.path.join(BASE_DIR, 'templates'),)
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
REGION_NAME = os.environ.get('AWS_REGION', 'ap-northeast-2')
AWS_STORAGE_BUCKET_NAME = conf_info['aws']['s3']['bucket_name']

# s3에 저장할 경로
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

DEFAULT_FILE_STORAGE = 'custom_storages.MediaStorage'
STATICFILES_STORAGE = 'custom_storages.StaticStorage'

DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800
FILE_UPLOAD_MAX_MEMORY_SIZE = 52428800

AWS_S3_REGION_NAME = REGION_NAME

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_URLS_REGEX = r'^/[graphql].*'

try:
    if STAGE == 'local':
        from .local_settings import *

        STATIC_ROOT = os.path.join(BASE_DIR, 'staticfile')
except Exception:
    pass
