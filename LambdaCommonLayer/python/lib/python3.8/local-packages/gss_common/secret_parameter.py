import logging
import boto3

logger = logging.getLogger(__name__)


def get_secret_parameter(key_id):
    if key_id is None:
        return None
    try:
        client = boto3.client('ssm')
        parameter = client.get_parameter(Name=key_id, WithDecryption=True)
        result = parameter.get('Parameter', {}).get('Value')
        if result is None:
            logger.info('Parameter does not exist', key_id)
            return None
        return result
    except BaseException:
        logger.warning('Failed to get secret parameter', exc_info=True)
        return None
