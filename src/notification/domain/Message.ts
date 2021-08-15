import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

export enum MessageType {
  SMS = 'SMS',
}

export interface MessageProps<ContentType> {
  type: MessageType;
  content: ContentType;
}

export abstract class Message<ContentType = any> extends ValueObject<MessageProps<ContentType>> {
  get type(): MessageType {
    return this.props.type;
  }

  get content(): ContentType {
    return this.props.content;
  }
}

export interface SmsMessageContent {
  body: string;
}

export type SmsMessageProps = Omit<MessageProps<SmsMessageContent>, 'type'>;

export class SmsMessage extends Message<SmsMessageContent> {
  static create(props: SmsMessageProps): Result<SmsMessage> {
    if (!props?.content?.body) return Result.fail('The SMS message body is empty or not specified');
    return Result.ok(new SmsMessage({ ...props, type: MessageType.SMS }));
  }
}
