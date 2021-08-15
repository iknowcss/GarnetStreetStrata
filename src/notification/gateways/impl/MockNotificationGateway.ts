import { NotificationGateway } from '../NotificationGateway';
import { Notification } from '../../domain/Notification';

export class MockNotificationGateway implements NotificationGateway {
  async getSentNotifications(): Promise<Notification[]> {
    throw new Error('Not implemented');
  }

  async send(notification: Notification): Promise<void> {
    notification.toString();
    throw new Error('Not implemented');
  }
}
