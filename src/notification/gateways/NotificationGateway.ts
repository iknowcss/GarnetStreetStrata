import { Notification } from '../domain/Notification';
import { Resident } from '../domain/Resident';

export interface NotificationGateway {
  send(notification: Notification): Promise<void>;
  getSentNotifications(): Promise<Notification[]>;
}
