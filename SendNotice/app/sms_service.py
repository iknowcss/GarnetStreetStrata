import os
import boto3


def build_message_request(message, destination_addresses):
    addresses = {}
    for address in destination_addresses:
        addresses[address] = {'ChannelType': 'SMS'}
    return {
        'Addresses': addresses,
        'MessageConfiguration': {'SMSMessage': {
            'Body': message,
            'MessageType': 'PROMOTIONAL',
            'SenderId': 'GrnetStrata',
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
        print('send_sms failed', exception)
        return False
