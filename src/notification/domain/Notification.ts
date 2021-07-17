import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { Message } from './Message';

export interface CreateNotificationProps {
  messages: Message<any>[];
}

export interface NotificationProps extends CreateNotificationProps {
  createdAt: Date;
  sentAt: Date | null;
}

export class Notification extends Entity<NotificationProps> {
  static create(props: CreateNotificationProps): Result<Notification> {
    const { messages } = props;
    if (messages.length === 0) {
      return Result.fail('Must specify at least one message');
    }
    return Result.ok(new Notification({ messages, createdAt: new Date(), sentAt: null }));
  }

  get messages(): Message<any>[] {
    return this.props.messages;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get sentAt(): Date | null {
    return this.props.sentAt;
  }
}
