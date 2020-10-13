import json
import pathlib
from OptOutEndpoint.app.parse_event import parse_delete_request


def test_parse_delete_request_from_event():
    with open(pathlib.Path(__file__).parent / 'httpReqDelete.json') as f:
        event = json.load(f)

    request = parse_delete_request(event)
    assert request.destination_address == '+61400800900'
    assert request.address_type == 'SMS'


def test_does_not_parse_invalid_request_shape():
    request = parse_delete_request({})
    assert request is None


def test_does_not_parse_invalid_phone_number():
    request = parse_delete_request({'pathParameters': {'proxy': 'sms/61401801972'}})
    assert request is None
