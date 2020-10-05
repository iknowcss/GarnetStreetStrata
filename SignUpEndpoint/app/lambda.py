import sys
sys.path.append('/opt/python/lib/python3.8/local-packages')

import json
from gss_common.distribution_list_entry import DistributionListEntry
from gss_common.distribution_list_repository import put_entry
from .sign_up_passcode import is_valid_passcode


def parse_http_sign_up_event(event):
    try:
        body = json.loads(event.get('body'))
        return {
            'entry': DistributionListEntry.from_json_map(body.get('entry')),
            'passcode': body.get('passcode'),
        }
    except BaseException as exception:
        print('Failed to parse request', exception)
    return None


def handler(event, context):
    request = parse_http_sign_up_event(event)
    if request is None:
        return {'statusCode': 400, 'body': json.dumps({'Success': False})}

    entry = request.get('entry')
    if entry is None:
        return {
            'statusCode': 400,
            'body': json.dumps({'Success': False, 'Error': 'Could not parse DistributionListEntry'}),
        }

    is_valid_passcode_result = is_valid_passcode(request.get('passcode'))
    if is_valid_passcode_result is None:
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to check passcode'})}
    if not is_valid_passcode_result:
        return {'statusCode': 400, 'body': json.dumps({'Success': False, 'Error': 'Invalid passcode'})}

    put_result = put_entry(entry)
    if put_result.get('Success') is not True:
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to store entry'})}

    return {'statusCode': 200, 'body': json.dumps({'Success': True})}
