import { SendNotification } from '../SendNotification';
import { SmsMessage } from '../../../domain/Message';
import { Notification } from '../../../domain/Notification';
import { testResident } from '../../../../shared/test/mock';

describe('SendNotification', () => {
  const notificationGateway = { send: jest.fn() };
  const residentGateway = { getResidentsWithSubscription: jest.fn() };
  const useCase = new SendNotification(notificationGateway as any, residentGateway as any);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('runs the happy case', async () => {
    const resident = testResident();
    residentGateway.getResidentsWithSubscription.mockResolvedValue([resident]);

    const result = await useCase.execute({ messageBody: 'This is a test notification' });
    expect(result.isHappy()).toBe(true);

    expect(notificationGateway.send).toHaveBeenCalledTimes(1);
    const [actualNotification] = notificationGateway.send.mock.calls[0];
    const { messages, residents } = actualNotification as Notification;
    expect(messages).toHaveLength(1);
    expect(messages[0].constructor).toBe(SmsMessage);
    expect((messages[0] as SmsMessage).body).toBe('This is a test notification');
    expect(residents).toHaveLength(1);
    expect(residents[0]).toEqual(resident);
  });
});
