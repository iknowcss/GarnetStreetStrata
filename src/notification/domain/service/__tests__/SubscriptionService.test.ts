import { SubscriptionAlreadyExists, SubscriptionCreated, SubscriptionService } from '../SubscriptionService';
import { testResident, testSmsContactDetails } from '../../../../shared/test/mock';
import { Subscription, Subscriptions } from '../../Subscription';

describe('SubscriptionService', () => {
  const service = new SubscriptionService();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('subscribeResident', () => {
    it('subscribes a resident using SMS details', () => {
      const resident = testResident();
      const smsDetails = testSmsContactDetails();
      const result = service.subscribeResident(resident, smsDetails);
      expect(result.isHappy()).toBe(true);
      expect(result.value.constructor).toEqual(SubscriptionCreated);
      expect(resident.subscriptions.getNewItems()).toHaveLength(1);
      const [subscription] = resident.subscriptions.getNewItems();
      expect(subscription.resident).toEqual(resident);
      expect(subscription.contactDetails).toEqual(smsDetails);
    });

    it('gracefully ignores an identical subscription', () => {
      const contactDetails = testSmsContactDetails();
      const resident = testResident({
        subscriptions: Subscriptions.create([
          Subscription.create({ contactDetails, resident: null as any }).getValue(),
        ]).getValue(),
      });

      const result = service.subscribeResident(resident, contactDetails);
      expect(result.isHappy()).toBe(true);
      expect(result.value.constructor).toEqual(SubscriptionAlreadyExists);
      expect(resident.subscriptions.getNewItems()).toHaveLength(0);
    });
  });
});
