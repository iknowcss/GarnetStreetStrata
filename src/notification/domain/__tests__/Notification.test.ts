import { Notification } from '../Notification';
import { testMessage, testResident } from '../../../shared/test/mock';

describe('Notification', () => {
  it('creates', () => {
    const messages = [testMessage()];
    const residents = [testResident()];
    const notification = Notification.create({ residents, messages }).getValue();
    expect(notification.messages).toEqual(messages);
    expect(notification.residents).toEqual(residents);
    expect(notification.createdAt.constructor).toEqual(Date);
    expect(notification.sentAt).toBeNull();
  });

  it('does not create with empty messages array', () => {
    expect(Notification.create({ residents: [testResident()], messages: [] }).isFailure).toBe(true);
  });

  it('does not create with empty residents array', () => {
    expect(Notification.create({ residents: [], messages: [testMessage()] }).isFailure).toBe(true);
  });
});
