import re

DESTINATION_ADDRESS_SMS_AU = re.compile('^\\+61[1-9][0-9]{8}$')


class DeleteRequest:
    @staticmethod
    def from_event(event):
        destination_address = event.get('pathParameters', {}).get('proxy', None)
        if destination_address and DESTINATION_ADDRESS_SMS_AU.match(destination_address):
            return DeleteRequest(destination_address)
        return None

    def __init__(self, destination_address):
        self.destination_address = destination_address
