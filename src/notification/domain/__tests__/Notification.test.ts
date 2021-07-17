import { Notification } from '../Notification';
import { Message } from '../Message';

describe('Notification', () => {
  it('creates', () => {
    const message = Message.create({ body: 'This is a test' }).getValue();
    const notification = Notification.create({ message }).getValue();
    expect(notification.message).toEqual(message);
    expect(notification.createdAt.constructor).toEqual(Date);
    expect(notification.sentAt).toBeNull();
  });
});
