import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

export enum MessageType {
  SMS = 'SMS',
}

export interface MessageProps {
  type: MessageType;
}

export abstract class Message<Props> extends ValueObject<MessageProps & Omit<Props, 'type'>> {
  get type(): MessageType {
    return this.props.type;
  }
}

export interface SmsMessageProps {
  body: string;
}

export class SmsMessage extends Message<SmsMessageProps> {
  static create(props: SmsMessageProps): Result<SmsMessage> {
    if (!props.body) {
      return Result.fail('The SMS message body is empty or not specified');
    }
    return Result.ok(new SmsMessage({ ...props, type: MessageType.SMS }));
  }

  get body(): string {
    return this.props.body;
  }
}
