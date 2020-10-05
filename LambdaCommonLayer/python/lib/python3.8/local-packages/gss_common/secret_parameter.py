import boto3


def get_secret_parameter(key_id):
    if key_id is None:
        return None
    try:
        client = boto3.client('ssm')
        parameter = client.get_parameter(Name=key_id, WithDecryption=True)
        result = parameter.get('Parameter', {}).get('Value')
        if result is None:
            print('Parameter does not exist', key_id)
            return None
        return result
    except BaseException as exception:
        print('Failed to get secret parameter', exception)
        return None
