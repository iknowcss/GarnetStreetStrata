import { Notification } from '../Notification';
import { testMessage } from '../../../shared/test/mock';

describe('Notification', () => {
  it('creates', () => {
    const messages = [testMessage()];
    const notification = Notification.create({ messages }).getValue();
    expect(notification.messages).toEqual(messages);
    expect(notification.createdAt.constructor).toEqual(Date);
    expect(notification.sentAt).toBeNull();
  });

  it('does not create with empty messages array', () => {
    expect(Notification.create({ messages: [] }).isFailure).toBe(true);
  });
});
