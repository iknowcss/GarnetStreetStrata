import os
from gss_common.secret_parameter import get_secret_parameter


def is_valid_passcode(passcode):
    if passcode is None:
        return False
    parameter_name = os.environ.get('SIGN_UP_PASSCODE_KEY_ID')
    expected_passcode = get_secret_parameter(parameter_name)
    if expected_passcode is None:
        print('Failed to load expected sign-up passcode', parameter_name)
        return None
    return expected_passcode == passcode
