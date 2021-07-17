import { Notification } from '../domain/Notification';

export interface NotificationGateway {
  send(notification: Notification): Promise<void>;
  getSentNotifications(): Promise<Notification[]>;
}
