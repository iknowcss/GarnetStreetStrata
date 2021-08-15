import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { Message } from './Message';
import { Resident } from './Resident';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export interface CreateNotificationProps {
  residents: Resident[];
  messages: Message[];
}

export interface NotificationProps extends CreateNotificationProps {
  createdAt: Date;
  sentAt: Date | null;
}

export class Notification extends Entity<NotificationProps> {
  static create(props: CreateNotificationProps): Result<Notification> {
    const { residents, messages } = props;
    if (!(messages?.length > 0)) return Result.fail('Must specify at least one message');
    if (!(residents?.length > 0)) return Result.fail('Must specify at least one resident');
    return Result.ok(new Notification({ residents, messages, createdAt: new Date(), sentAt: null }));
  }

  static hydrate(props: NotificationProps, id: UniqueEntityID): Result<Notification> {
    return Result.ok(new Notification(props, id));
  }

  get residents(): Resident[] {
    return this.props.residents;
  }

  get messages(): Message[] {
    return this.props.messages;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get sentAt(): Date | null {
    return this.props.sentAt;
  }
}
