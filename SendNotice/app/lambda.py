import sys
import json
import logging
sys.path.append('/opt/python/lib/python3.8/local-packages')

from gss_common.distribution_list_repository import get_entries
from gss_common.sms_service import send_sms
from gss_common.logging import init_logging

init_logging()
logger = logging.getLogger(__name__)


def is_health_check(event):
    try:
        health_check_value = event.get('HealthCheck')
        if health_check_value is True:
            logger.info('Health check complete')
            return True
    except BaseException as exception:
        logger.warning('Health check failed: %s', exception)
    return False


def parse_sms_message_body(event):
    try:
        return event.get('SMSMessageBody').strip()
    except BaseException as exception:
        logger.warning('Failed to parse SMS body from event: %s', exception)
        logger.debug('Event data: %s', json.dumps(event))
        return None


def handler(event, context):
    if is_health_check(event):
        return {'Success': True, 'Healthy': True}

    sms_message_body = parse_sms_message_body(event)
    if sms_message_body is None:
        logger.error('Failed to parse SMS message body')
        return {'Success': False, 'Error': 'Failed to parse SMS message body'}
    if len(sms_message_body) == 0:
        logger.info('Refuse to send an SMS with an empty body')
        return {'Success': False, 'Error': 'SMS message body is empty'}

    entries = get_entries()
    if entries is None:
        logger.error('Failed to get entries from distribution list')
        return {'Success': False, 'Error': 'Failed to get entries from distribution list'}

    sms_addresses = [entry.destination_address for entry in entries if entry.address_type == 'SMS']
    send_sms_result = send_sms('This is a test message', sms_addresses)
    if send_sms_result is not True:
        logger.error('Failed to send SMS')
        return {'Success': False, 'Error': 'Failed to send SMS'}
    return {'Success': True}
