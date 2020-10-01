from SendNotice.app.sms_service import build_message_request

class TestSMSService:
    def test_build_message_request(self):
        request = build_message_request(
            'This is a test',
            ['+61400100100', '+61400100200'],
        )

        addresses = request.get('Addresses')
        assert addresses.get('+61400100100').get('ChannelType') == 'SMS'
        assert addresses.get('+61400100200').get('ChannelType') == 'SMS'

        sms_message = request.get('MessageConfiguration').get('SMSMessage')
        assert sms_message.get('Body') == 'This is a test'
        assert sms_message.get('MessageType') == 'PROMOTIONAL'
        assert sms_message.get('SenderId') == 'GrnetStrata'
