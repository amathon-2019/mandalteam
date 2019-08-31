import sys

sys.path.append("/opt")

import serverless_wsgi
from mandalart.wsgi import application
from aws_xray_sdk.core import xray_recorder


# If you need to send additional content types as text, add then directly
# to the whitelist:
#
# serverless_wsgi.TEXT_MIME_TYPES.append("application/custom+json")

@xray_recorder.capture('init_lambda')
def handler(event, context):
    return serverless_wsgi.handle_request(application, event, context)
