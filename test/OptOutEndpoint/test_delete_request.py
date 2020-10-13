import json
import pathlib
from OptOutEndpoint.app.delete_request import DeleteRequest


def test_parse_delete_request_from_event():
    with open(pathlib.Path(__file__).parent / 'httpReqDelete.json') as f:
        event = json.load(f)

    request = DeleteRequest.from_event(event)
    assert request.destination_address == '+61400800900'


def test_does_not_parse_invalid_request_shape():
    request = DeleteRequest.from_event({})
    assert request is None


def test_does_not_parse_invalid_phone_number():
    request = DeleteRequest.from_event({'pathParameters': {'proxy': '61401801972'}})
    assert request is None
