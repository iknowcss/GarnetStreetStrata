from .distribution_list_repository import get_entries
from .sms_service import send_sms


def parse_sms_message_body(event):
    try:
        return event.get('SMSMessageBody').strip()
    except BaseException as exception:
        print('Failed to parse event', event, exception)
        return None


def handler(event, context):
    sms_message_body = parse_sms_message_body(event)
    if sms_message_body is None:
        return {'Success': False, 'Error': 'Failed to parse SMS message body'}
    if len(sms_message_body) == 0:
        return {'Success': False, 'Error': 'SMS message body is empty'}

    entries = get_entries()
    if entries is None:
        return {'Success': False, 'Error': 'Failed to get entries from distribution list'}

    sms_addresses = [entry.destination_address for entry in entries if entry.address_type == 'SMS']
    return {'Success': send_sms('This is a test message', sms_addresses)}
