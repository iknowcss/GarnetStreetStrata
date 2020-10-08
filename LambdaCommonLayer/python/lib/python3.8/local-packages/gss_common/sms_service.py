import os
import logging
import boto3

logger = logging.getLogger(__name__)


def build_message_request(message, destination_addresses):
    addresses = {}
    for address in destination_addresses:
        addresses[address] = {'ChannelType': 'SMS'}
    return {
        'Addresses': addresses,
        'MessageConfiguration': {'SMSMessage': {
            'Body': message,
            'MessageType': 'PROMOTIONAL',
        }},
    }


def send_sms(message, destination_addresses):
    client = boto3.client('pinpoint')
    try:
        client.send_messages(
            ApplicationId=os.environ.get('PINPOINT_PROJECT_ID'),
            MessageRequest=build_message_request(message, destination_addresses),
        )
        return True
    except BaseException as exception:
        logger.warning('Failed to send SMS', exception)
        return False
