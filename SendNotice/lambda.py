import os
import boto3

def handler(event, context):
    PINPOINT_PROJECT_ID = os.environ.get('PINPOINT_PROJECT_ID')
    db = boto3.client('dynamodb')

    try:
        result = db.scan(
            TableName=DISTRIBUTION_LIST_TABLE_NAME
        )
        return {'Success': True, 'Items': result.get('Items')}
    except BaseException as e:
        return {'Success': False, 'Error': str(e)}
