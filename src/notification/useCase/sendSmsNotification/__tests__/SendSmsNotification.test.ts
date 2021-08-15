import { SendSmsNotification } from '../SendSmsNotification';
import { SmsMessage } from '../../../domain/Message';
import { Notification } from '../../../domain/Notification';

describe('SendSmsNotification', () => {
  const notificationGateway = { send: jest.fn() };
  const useCase = new SendSmsNotification(notificationGateway as any);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('runs the happy case', async () => {
    const result = await useCase.execute({ messageBody: 'This is a test notification' });
    expect(result.isHappy()).toBe(true);

    expect(notificationGateway.send).toHaveBeenCalledTimes(1);
    const [actualNotification] = notificationGateway.send.mock.calls[0];
    const notificationMessages = (actualNotification as Notification).messages;
    expect(notificationMessages).toHaveLength(1);
    expect(notificationMessages[0].constructor).toBe(SmsMessage);
    expect((notificationMessages[0] as SmsMessage).body).toBe('This is a test notification');
  });
});
