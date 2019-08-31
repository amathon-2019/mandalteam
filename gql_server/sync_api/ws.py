import sys

sys.path.append("/opt")
import json
from datetime import datetime
from dictdiffer import diff
import boto3

print(boto3.__version__)

# from datetime import datetime

print("default import")
try:
    from session_db import SessionDB
except Exception:
    from .session_db import SessionDB
from chartdata import ChartData

print("import session_db")


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


subs = ["A", "B", "C", "D", "E", "F", "G", "H"]


def manager(event, context):
    print(event, context)
    _context = event["requestContext"]
    event_type = _context["eventType"]
    route_key = _context["routeKey"]
    conn_id = _context["connectionId"]
    body = json.loads(event['body'])
    print(event_type, conn_id)
    session = SessionDB.get(conn_id)
    msg = {"ok": False}
    if route_key == "ping":
        msg['ok'] = True
    else:
        hashid = body.get('chart')
        if not hashid:
            session.send_msg(event, {"ok": False, "message": "can't not find chart hashid"})
            return {"statusCode": 406}

        if route_key == 'init':

            msg = {
                "ok": True,
                "message": "init room"
            }
            session.chart = hashid
            session.save()


        elif route_key == "edit":
            location = body.get('location')
            text = body.get('text')
            raw = ChartData.get(hashid)
            x, y = location
            x, y = (subs.index(x), int(y))
            raw.chart[x].data[y].text = text
            raw.save()
            msg['ok'] = True

    session.send_msg(event, msg)
    return {"statusCode": 200}


def sync(event, context):
    records = event["Records"]
    for record in records:
        if record['eventName'] == 'MODIFY':
            ddb = record['dynamodb']
            chart = ddb['Keys']['hashid']['S']
            new = ddb["NewImage"]
            old = ddb["OldImage"]
            result = list(diff(old, new))
            for r in result:
                # 셀 수정
                data = None
                if r[1][0] == "chart":
                    sub_index = r[1][2]
                    cell_index = r[1][6]
                    data = {
                        "type": "changed",
                        "location": f"{subs[sub_index]}{cell_index}",
                        "text": new['chart']["L"][sub_index]["M"]["data"]["L"][cell_index]["M"].get("text", {}).get("S",
                                                                                                                    ''),
                    }
                if data:
                    print(data)
                    for s in SessionDB.chart_index.query(hash_key=chart):
                        domain = "hzm41kw816.execute-api.ap-northeast-2.amazonaws.com"
                        stage = "dev"
                        s._send_msg(domain, stage, data)
                        print("커넥션 : ", s.connection_id, "  차트 : ", s.chart, " 데이터", data)

                else:
                    # 제목 수정
                    pass

        pass
    print(event, context)
    return {"statusCode": 200}
