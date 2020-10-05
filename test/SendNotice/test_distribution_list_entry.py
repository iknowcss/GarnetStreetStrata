from gss_common.distribution_list_entry import DistributionListEntry, RecipientInfo

class TestDistributionListEntry:
    def test_from_json_map_all_data(self):
        result = RecipientInfo.from_json_map({'occupantType': 'OWNER', 'unitNumber': '49'})
        assert result.occupant_type == 'OWNER'
        assert result.unit_number == '49'

    def test_from_json_map_no_unit_number(self):
        result = RecipientInfo.from_json_map({'occupantType': 'RENTER'})
        assert result.occupant_type == 'RENTER'
        assert result.unit_number is None

    def test_from_json_map_invalid_occupant_type(self):
        result = RecipientInfo.from_json_map({'occupantType': '???'})
        assert result is None

    def test_from_json_map_missing_occupant_type(self):
        result = RecipientInfo.from_json_map({})
        assert result is None

    def test_from_json_map_invalid_unit_number(self):
        result = RecipientInfo.from_json_map({'occupantType': 'RENTER', 'unitNumber': 'a1sd2f'})
        assert result.occupant_type == 'RENTER'
        assert result.unit_number == '12'

    def test_from_json_map_full(self):
        result = DistributionListEntry.from_json_map({
            'DestinationAddress': '+61400100100',
            'AddressType': 'SMS',
            'RecipientInfo': {'occupantType': 'RENTER', 'unitNumber': '42'},
        })
        assert result.destination_address == '+61400100100'
        assert result.address_type == 'SMS'
        assert result.recipient_info.occupant_type == 'RENTER'
        assert result.recipient_info.unit_number == '42'

    def test_from_json_map_invalid_address(self):
        result = DistributionListEntry.from_json_map({
            'DestinationAddress': '+18005553465',
            'AddressType': 'SMS',
            'RecipientInfo': {'occupantType': 'RENTER', 'unitNumber': '42'},
        })
        assert result is None

    def test_from_json_map_invalid_address_type(self):
        result = DistributionListEntry.from_json_map({
            'DestinationAddress': '+61400100100',
            'AddressType': 'SNAIL_MAIL',
            'RecipientInfo': {'occupantType': 'RENTER', 'unitNumber': '42'},
        })
        assert result is None

    def test_from_json_map_invalid_recipient_info(self):
        result = DistributionListEntry.from_json_map({
            'DestinationAddress': '+61400100100',
            'AddressType': 'SMS',
            'RecipientInfo': {'occupantType': 'CORPORATE_OVERLORD', 'unitNumber': '42'},
        })
        assert result is None
