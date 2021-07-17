import { Subscription } from '../Subscription';
import { testResident, testSmsContactDetails } from '../../../shared/test/mock';

describe('Subscription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('builds a subscription', async () => {
    const resident = testResident();
    const contactDetails = testSmsContactDetails();
    const subscription = Subscription.create({ resident, contactDetails }).getValue();
    expect(subscription.resident).toEqual(resident);
    expect(subscription.contactDetails).toEqual(contactDetails);
  });
});
