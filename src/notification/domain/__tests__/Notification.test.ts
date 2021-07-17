import { Notification } from '../Notification';
import { mockMessage } from '../../../shared/test/mock';

describe('Notification', () => {
  it('creates', () => {
    const messages = [mockMessage()];
    const notification = Notification.create({ messages }).getValue();
    expect(notification.messages).toEqual(messages);
    expect(notification.createdAt.constructor).toEqual(Date);
    expect(notification.sentAt).toBeNull();
  });

  it('does not create with empty messages array', () => {
    expect(Notification.create({ messages: [] }).isFailure).toBe(true);
  });
});
