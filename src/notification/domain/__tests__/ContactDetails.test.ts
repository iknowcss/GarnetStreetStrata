import { ContactDetailsType, SmsContactDetails } from '../ContactDetails';
import { testPhoneNumber } from '../../../shared/test/mock';

describe('ContactDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('SmsContactDetails', () => {
    it('runs', async () => {
      const mobileNumber = testPhoneNumber();
      const value = SmsContactDetails.create({ mobileNumber }).getValue();
      expect(value.type).toEqual(ContactDetailsType.SMS);
      expect(value.mobileNumber).toEqual(mobileNumber);
    });
  });
});
