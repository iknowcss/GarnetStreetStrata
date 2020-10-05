import os
import boto3
from .distribution_list_entry import DistributionListEntry


def get_entries():
    """
    A list of all destination addresses in the distribution list

    :rtype: list of DistributionListEntry | None
    :returns: The list of addresses when successful, otherwise `None`.
    """

    client = boto3.client('dynamodb')
    table_name = os.environ.get('DISTRIBUTION_LIST_TABLE_NAME')
    table_scan_limit = int(os.environ.get('DISTRIBUTION_LIST_TABLE_SCAN_LIMIT', 1000))
    entries = []

    try:
        paginator = client.get_paginator('scan')
        iterator = paginator.paginate(
            TableName=table_name,
            Limit=table_scan_limit,
        )
        for page in iterator:
            entries.extend([DistributionListEntry.from_ddb(item) for item in page.get('Items')])
    except BaseException as exception:
        print('Failed to fetch distribution list from data source', exception)
        return None
    return entries


def put_sms_entry(destination_address, recipient_info):
    """
    Adds the specified SMS address to the distribution list for future distributions.

    :param str destination_address: The endpoint address, e.g. `'+61400500600'`
    :param RecipientInfo recipient_info: The endpoint address, e.g. `'+61400500600'`
    :rtype: dict
    :returns: `{'Success': True}` when added successfully, otherwise `{'Success': False}`.
    """
    return put_entry(DistributionListEntry(destination_address, 'SMS', recipient_info))


def put_entry(entry):
    client = boto3.client('dynamodb')
    table_name = os.environ.get('DISTRIBUTION_LIST_TABLE_NAME')

    try:
        result = client.put_item(
            TableName=table_name,
            Item=entry.to_ddb(),
        )
        if result.get('ResponseMetadata').get('HTTPStatusCode') != 200:
            print('Failed to add new destination to distribution list data source', result)
            return {'Success': False}
        return {'Success': True}
    except BaseException as exception:
        print('Failed to add new destination to distribution list data source', exception)
        return {'Success': False}
