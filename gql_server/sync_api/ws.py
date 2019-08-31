import sys
sys.path.append("/opt")
import json
from datetime import datetime

import boto3
print(boto3.__version__)

# from datetime import datetime

print("default import")
try:
    from session_db import SessionDB
except Exception:
    from .session_db import SessionDB

print("import session_db")


def get_client(context):
    _context = context["requestContext"]
    domain = _context["domainName"]
    stage = _context["stage"]
    return boto3.client("apigatewaymanagementapi", endpoint_url=f"https://{domain}/{stage}")


def connect(event, context):
    print("start logic")
    event_type = event["requestContext"]["eventType"]
    conn_id = event["requestContext"]["connectionId"]
    print(event_type, conn_id)

    if event_type == "CONNECT":
        print('start connect')
        try:
            request = SessionDB(conn_id, createdAt=datetime.now())
            request.save()
        except Exception as e:
            print(e)
            return {"statusCode": 502, "body": str(e)}
    elif event_type == "DISCONNECT":
        print('end connect')
        try:
            request = SessionDB.get(conn_id)
            request.delete()
        except Exception as e:
            print(e)
            return {"statusCode": 502, "body": str(e)}
    print('process ok')
    return {"statusCode": 200}


def manager(event, context):
    print(event, context)
    _context = event["requestContext"]
    event_type = _context["eventType"]
    route_key = _context["routeKey"]
    conn_id = _context["connectionId"]
    body = json.loads(event['body'])
    print(event_type, conn_id)
    if route_key == 'init':

        data = {
            "type": "init",
            "body": body
        }
        cli = get_client(event)
        cli.post_to_connection(ConnectionId=conn_id, Data=json.dumps(data))
    elif route_key == "edit":
        pass

    return {"statusCode": 200}


def sync(event, context):
    print(event, context)
    event_type = event["requestContext"]["eventType"]
    conn_id = event["requestContext"]["connectionId"]
    print(event_type, conn_id)
    return {"statusCode": 200}
