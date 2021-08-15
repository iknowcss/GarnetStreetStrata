import { SmsContactMethod } from '../SmsContactMethod';
import { testPhoneNumber } from '../../../shared/test/mock';
import { MessageType } from '../Message';

describe('SmsContactMethod', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('runs', async () => {
    const mobileNumber = testPhoneNumber();
    const value = SmsContactMethod.create({ mobileNumber }).getValue();
    expect(value.type).toEqual(MessageType.SMS);
    expect(value.mobileNumber).toEqual(mobileNumber);
  });
});
