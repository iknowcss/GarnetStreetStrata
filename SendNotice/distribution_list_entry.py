class RecipientInfo:
    @staticmethod
    def from_ddb(raw_recipient_info):
        return RecipientInfo(
            raw_recipient_info.get('occupantType', {}).get('S'),
            raw_recipient_info.get('unitNumber', {}).get('S', None),
        )

    def __init__(self, occupant_type, unit_number=None):
        self.occupant_type = occupant_type
        self.unit_number = unit_number

    def to_ddb(self):
        result_map = {'occupantType': {'S': self.occupant_type}}
        if self.unit_number is not None:
            result_map['unitNumber'] = {'S': self.unit_number}
        return {'M': result_map}


class DistributionListEntry:
    @staticmethod
    def from_ddb(ddb_item):
        return DistributionListEntry(
            destination_address=ddb_item.get('DestinationAddress').get('S'),
            address_type=ddb_item.get('AddressType', {}).get('S', 'SMS'),
            recipient_info=RecipientInfo.from_ddb(ddb_item.get('RecipientInfo', {}).get('M', {})),
        )

    def __init__(self, destination_address, address_type, recipient_info):
        """
        :param str destination_address:
        :param str address_type:
        :param RecipientInfo recipient_info:
        """
        self.destination_address = destination_address
        self.address_type = address_type
        self.recipient_info = recipient_info

    def to_ddb(self):
        return {
            'DestinationAddress': {'S': self.destination_address},
            'AddressType': {'S': self.address_type},
            'RecipientInfo': self.recipient_info.to_ddb(),
        }
