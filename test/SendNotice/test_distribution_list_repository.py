import mock
import os
import boto3
from moto import mock_dynamodb2
from SendNotice.distribution_list_repository import get_entries, put_sms_entry
from SendNotice.distribution_list_entry import DistributionListEntry, RecipientInfo


@mock_dynamodb2
@mock.patch.dict(os.environ, {
    'DISTRIBUTION_LIST_TABLE_NAME': 'DistributionListTable',
    'DISTRIBUTION_LIST_TABLE_SCAN_LIMIT': '3',
})
class TestDistributionListRepository:
    def __create_table(self):
        boto3.client('dynamodb').create_table(
            TableName='DistributionListTable',
            AttributeDefinitions=[{'AttributeName': 'DestinationAddress', 'AttributeType': 'S'}],
            KeySchema=[{'AttributeName': 'DestinationAddress', 'KeyType': 'HASH'}],
        )

    def __drop_table(self):
        try:
            boto3.client('dynamodb').delete_table(TableName='DistributionListTable')
        except BaseException:
            pass

    def setup(self):
        self.__create_table()

    def teardown(self):
        self.__drop_table()

    def seed_items(self, items):
        client = boto3.client('dynamodb')
        for item in items:
            client.put_item(TableName='DistributionListTable', Item=item.to_ddb())

    def test_get_entries(self):
        self.seed_items([
            DistributionListEntry('+61400100100', 'SMS', RecipientInfo('RENTER')),
            DistributionListEntry('+61400100200', 'SMS', RecipientInfo('OWNER')),
            DistributionListEntry('+61400100300', 'SMS', RecipientInfo('RENTER', '42')),
            DistributionListEntry('+61400100400', 'SMS', RecipientInfo('OWNER', '49')),
            DistributionListEntry('+61400100500', 'SMS', RecipientInfo('RENTER')),
            DistributionListEntry('+61400100600', 'SMS', RecipientInfo('RENTER')),
            DistributionListEntry('+61400100700', 'SMS', RecipientInfo('RENTER')),
        ])

        result = get_entries()
        assert set([(
            entry.destination_address,
            entry.address_type,
            entry.recipient_info.occupant_type,
            entry.recipient_info.unit_number,
        ) for entry in result]) == {
            ('+61400100100', 'SMS', 'RENTER', None),
            ('+61400100200', 'SMS', 'OWNER', None),
            ('+61400100300', 'SMS', 'RENTER', '42'),
            ('+61400100400', 'SMS', 'OWNER', '49'),
            ('+61400100500', 'SMS', 'RENTER', None),
            ('+61400100600', 'SMS', 'RENTER', None),
            ('+61400100700', 'SMS', 'RENTER', None),
        }

    def test_get_destination_addresses_exception(self):
        self.__drop_table()
        result = get_entries()
        assert result == None

    def test_put_sms_entry(self):
        self.seed_items([DistributionListEntry('+61400100100', 'SMS', RecipientInfo('RENTER'))])
        assert put_sms_entry('+61400100200', RecipientInfo('OWNER', '49')) is True
        result = get_entries()
        assert set([(
            entry.destination_address,
            entry.address_type,
            entry.recipient_info.occupant_type,
            entry.recipient_info.unit_number,
        ) for entry in result]) == {
            ('+61400100100', 'SMS', 'RENTER', None),
            ('+61400100200', 'SMS', 'OWNER', '49'),
        }

    def test_put_sms_entry_exception(self):
        self.__drop_table()
        assert put_sms_entry('+61400100200', RecipientInfo('RENTER')) is False
