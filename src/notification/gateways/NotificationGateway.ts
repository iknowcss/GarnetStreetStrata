import { Notification } from '../domain/Notification';
import { Subscription } from '../domain/Subscription';

export interface NotificationGateway {
  send(notification: Notification, subscriptions: Subscription[]): Promise<void>;
  getSentNotifications(): Promise<Notification[]>;
}
