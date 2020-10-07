import os
import logging
from gss_common.secret_parameter import get_secret_parameter

logger = logging.getLogger(__name__)


def is_valid_passcode(passcode):
    if passcode is None:
        logger.info('passcode is null')
        return False
    parameter_name = os.environ.get('SIGN_UP_PASSCODE_KEY_ID')
    expected_passcode = get_secret_parameter(parameter_name)
    if expected_passcode is None:
        logger.warning('Failed to load expected sign-up passcode secret parameter with name "%s"', parameter_name)
        return None
    return expected_passcode == passcode
