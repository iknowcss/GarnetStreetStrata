import logging
import re

logger = logging.getLogger(__name__)
OCCUPANT_TYPE_PATTERN = re.compile('^(RENTER|OWNER)$')
DESTINATION_ADDRESS_SMS_AU = re.compile('^\\+61[1-9][0-9]{8}$')
ADDRESS_TYPE_PATTER = re.compile('^(SMS)$')


def parse_value(pattern, string_input):
    if string_input is None:
        return None
    output = pattern.match(string_input)
    if output is None:
        return None
    return output.string


class RecipientInfo:
    @staticmethod
    def from_ddb(raw_recipient_info):
        return RecipientInfo(
            raw_recipient_info.get('occupantType', {}).get('S'),
            raw_recipient_info.get('unitNumber', {}).get('S', None),
        )

    @staticmethod
    def from_json_map(json_map):
        if json_map is None:
            logger.info('from_json_map: json_map is None')
            return None
        occupant_type = parse_value(OCCUPANT_TYPE_PATTERN, json_map.get('occupantType', None))
        if occupant_type is None:
            logger.info('from_json_map: Failed to parse occupantType')
            return None
        unit_number = json_map.get('unitNumber', None)
        if type(unit_number) == str:
            unit_number = re.sub(r'[^0-9]', '', unit_number)[0:3]
        else:
            unit_number = None
        return RecipientInfo(occupant_type, unit_number)

    def __init__(self, occupant_type, unit_number=None):
        self.occupant_type = occupant_type
        self.unit_number = unit_number

    def to_ddb(self):
        result_map = {'occupantType': {'S': self.occupant_type}}
        if self.unit_number is not None:
            result_map['unitNumber'] = {'S': self.unit_number}
        return {'M': result_map}

    def to_json_map(self):
        return {
            'occupantType': self.occupant_type,
            'unitNumber': self.unit_number,
        }


class DistributionListEntry:
    @staticmethod
    def from_ddb(ddb_item):
        return DistributionListEntry(
            destination_address=ddb_item.get('DestinationAddress').get('S'),
            address_type=ddb_item.get('AddressType', {}).get('S', 'SMS'),
            recipient_info=RecipientInfo.from_ddb(ddb_item.get('RecipientInfo', {}).get('M', {})),
        )

    @staticmethod
    def from_json_map(json_map):
        destination_address = parse_value(DESTINATION_ADDRESS_SMS_AU, json_map.get('DestinationAddress', None))
        address_type = parse_value(ADDRESS_TYPE_PATTER, json_map.get('AddressType', None))
        recipient_info = RecipientInfo.from_json_map(json_map.get('RecipientInfo', None))
        if destination_address is None or address_type is None or recipient_info is None:
            logger.info('from_json_map: Missing data', {
                "destination_address": destination_address is None,
                "address_type": address_type is None,
                "recipient_info": recipient_info is None,
            })
            return None
        return DistributionListEntry(destination_address, address_type, recipient_info)

    def __init__(self, destination_address, address_type, recipient_info=None):
        """
        :param str destination_address:
        :param str address_type:
        :param RecipientInfo recipient_info:
        """
        self.destination_address = destination_address
        self.address_type = address_type
        self.recipient_info = recipient_info

    def to_ddb(self):
        result = {
            'DestinationAddress': {'S': self.destination_address},
            'AddressType': {'S': self.address_type},
        }
        if self.recipient_info:
            result['RecipientInfo'] = self.recipient_info.to_ddb()
        return result

    def to_json_map(self):
        return {
            'DestinationAddress': self.destination_address,
            'AddressType': self.address_type,
            'RecipientInfo': self.recipient_info.to_json_map(),
        }
