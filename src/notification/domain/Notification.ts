import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { Message } from './Message';

export interface CreateNotificationProps {
  message: Message;
}

export interface NotificationProps extends CreateNotificationProps {
  createdAt: Date;
  sentAt: Date | null;
}

export class Notification extends Entity<NotificationProps> {
  static create(props: CreateNotificationProps): Result<Notification> {
    const { message } = props;
    return Result.ok(new Notification({ message, createdAt: new Date(), sentAt: null }));
  }

  get message(): Message {
    return this.props.message;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get sentAt(): Date | null {
    return this.props.sentAt;
  }
}
