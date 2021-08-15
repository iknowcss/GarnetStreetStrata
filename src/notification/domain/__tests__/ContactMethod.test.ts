import { SmsContactMethod } from '../ContactMethod';
import { testPhoneNumber } from '../../../shared/test/mock';
import { MessageType } from '../Message';

describe('ContactMethod', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('SmsContactMethod', () => {
    it('runs', async () => {
      const mobileNumber = testPhoneNumber();
      const value = SmsContactMethod.create({ mobileNumber }).getValue();
      expect(value.type).toEqual(MessageType.SMS);
      expect(value.mobileNumber).toEqual(mobileNumber);
    });
  });
});
