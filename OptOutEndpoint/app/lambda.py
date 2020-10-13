import sys
import logging
sys.path.append('/opt/python/lib/python3.8/local-packages')

import json
from gss_common.logging import init_logging
from gss_common.distribution_list_repository import delete_entry
from .parse_event import parse_delete_request

init_logging()

logger = logging.getLogger(__name__)


def handler(event, context):
    entry = parse_delete_request(event)
    if entry is None:
        logger.info('Invalid delete request', event)
        return {'statusCode': 400, 'body': json.dumps({'Success': False})}

    delete_result = delete_entry(entry.destination_address, entry.address_type)
    if delete_result.get('Success') is not True:
        logger.error('Failed to delete distribution list entry')
        return {'statusCode': 500, 'body': json.dumps({'Success': False})}

    return {'statusCode': 200, 'body': json.dumps({'Success': True})}
