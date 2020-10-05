import sys
sys.path.append('/opt/python/lib/python3.8/local-packages')

import json
from gss_common.distribution_list_entry import DistributionListEntry
from gss_common.distribution_list_repository import put_entry
from gss_common.sms_service import send_sms
from .sign_up_passcode import is_valid_passcode

INTRO_SMS_BODY = 'Welcome to the Garnet Street Strata notification service!\n\nTo cancel, text "STOP" at any time'


def parse_http_sign_up_event(event):
    try:
        body = json.loads(event.get('body'))
        return {
            'entry': DistributionListEntry.from_json_map(body.get('entry')),
            'passcode': body.get('passcode'),
            'acceptTerms': body.get('acceptTerms'),
        }
    except BaseException as exception:
        print('Failed to parse request', exception)
    return None


def handler(event, context):
    request = parse_http_sign_up_event(event)
    if request is None:
        print('handler: request could not be parsed')
        return {'statusCode': 400, 'body': json.dumps({'Success': False})}

    if request.get('acceptTerms') is not True:
        print('handler: user did not accept terms')
        return {
            'statusCode': 400,
            'body': json.dumps({
                'Success': False,
                'Error': 'acceptTerms must be true',
                'ErrorCode': 'TERMS_NOT_ACCEPTED',
            }),
        }

    entry = request.get('entry')
    if entry is None:
        print('handler: request did not include a valid entry')
        return {
            'statusCode': 400,
            'body': json.dumps({
                'Success': False,
                'Error': 'Could not parse DistributionListEntry',
                'ErrorCode': 'INVALID_SIGN_UP_DATA',
            }),
        }

    is_valid_passcode_result = is_valid_passcode(request.get('passcode'))
    if is_valid_passcode_result is None:
        print('handler: failed to check passcode')
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to check passcode'})}
    if not is_valid_passcode_result:
        print('handler: invalid passcode')
        return {'statusCode': 400, 'body': json.dumps({
            'Success': False,
            'Error': 'Invalid passcode',
                'ErrorCode': 'INVALID_PASSCODE',
        })}

    put_result = put_entry(entry)
    if put_result.get('Success') is not True:
        print('handler: failed to store entry')
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to store entry'})}

    print('handler: stored entry')
    if put_result.get('IsNewEntry'):
        print('handler: new entry, send intro SMS')
        send_sms_result = send_sms(INTRO_SMS_BODY, [entry.destination_address])
        if send_sms_result is not True:
            print('handler: failed to send intro SMS')
    else:
        print('handler: do not send intro SMS')
    return {'statusCode': 200, 'body': json.dumps({'Success': True})}
