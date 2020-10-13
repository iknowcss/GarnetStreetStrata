import sys
import logging
sys.path.append('/opt/python/lib/python3.8/local-packages')

import json
from gss_common.logging import init_logging
from .delete_request import DeleteRequest

init_logging()

logger = logging.getLogger(__name__)


def handler(event, context):
    request = DeleteRequest.from_event(event)
    if request is None:
        logger.info('Invalid delete request', event)
        return {'statusCode': 400, 'body': json.dumps({'Success': False})}
    return {'statusCode': 200, 'body': json.dumps({'Success': True})}
