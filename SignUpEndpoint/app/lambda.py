import sys
import json
import logging
sys.path.append('/opt/python/lib/python3.8/local-packages')

from gss_common.distribution_list_entry import DistributionListEntry
from gss_common.distribution_list_repository import put_entry
from gss_common.sms_service import send_sms
from gss_common.logging import init_logging
from .sign_up_passcode import is_valid_passcode

init_logging()

logger = logging.getLogger(__name__)

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
        logger.info('Exception while parsing sign-up request: %s', exception)
    return None


def handler(event, context):
    request = parse_http_sign_up_event(event)
    if request is None:
        logger.info('Client sign-up request was not valid')
        return {'statusCode': 400, 'body': json.dumps({'Success': False})}

    if request.get('acceptTerms') is not True:
        logger.info('Client sign-up request terms not accepted')
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
        logger.info('Client sign-up request did not include a valid DistributionListEntry')
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
        logger.error('Failed to validate passcode')
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to check passcode'})}
    if not is_valid_passcode_result:
        logger.info('Client sign-up request had an invalid passcode')
        return {'statusCode': 400, 'body': json.dumps({
            'Success': False,
            'Error': 'Invalid passcode',
            'ErrorCode': 'INVALID_PASSCODE',
        })}

    put_result = put_entry(entry)
    if put_result.get('Success') is not True:
        logger.error('Failed to persist client sign-up to data store')
        return {'statusCode': 500, 'body': json.dumps({'Success': False, 'Error': 'Failed to store entry'})}

    if put_result.get('IsNewEntry'):
        logger.info('Send intro SMS to new user')
        send_sms_result = send_sms(INTRO_SMS_BODY, [entry.destination_address])
        if send_sms_result is not True:
            logger.warning('Failed to send intro SMS')
    else:
        logger.info('Do not send intro SMS to existing user')
    return {'statusCode': 200, 'body': json.dumps({'Success': True})}
