import { SendSmsNotification } from '../SendSmsNotification';
import { testSubscription } from '../../../../shared/test/mock';
import { MessageType, SmsMessage } from '../../../domain/Message';
import { Notification } from '../../../domain/Notification';

describe('SendSmsNotification', () => {
  const subscriptionGateway = { getSubscriptions: jest.fn() };
  const notificationGateway = { send: jest.fn() };
  const useCase = new SendSmsNotification(subscriptionGateway as any, notificationGateway as any);
  let subscriptions;

  beforeEach(() => {
    jest.resetAllMocks();
    subscriptions = [testSubscription()];
    subscriptionGateway.getSubscriptions.mockImplementation(() => Promise.resolve(subscriptions));
  });

  it('runs the happy case', async () => {
    const result = await useCase.execute({ messageBody: 'This is a test notification' });
    expect(result.isHappy()).toBe(true);

    expect(subscriptionGateway.getSubscriptions).toHaveBeenCalledTimes(1);
    expect(subscriptionGateway.getSubscriptions).toHaveBeenCalledWith({ type: MessageType.SMS });

    expect(notificationGateway.send).toHaveBeenCalledTimes(1);
    const [actualNotification, actualSubs] = notificationGateway.send.mock.calls[0];
    const notificationMessages = (actualNotification as Notification).messages;
    expect(notificationMessages).toHaveLength(1);
    expect(notificationMessages[0].constructor).toBe(SmsMessage);
    expect((notificationMessages[0] as SmsMessage).body).toBe('This is a test notification');
    expect(actualSubs).toEqual(subscriptions);
  });
});
