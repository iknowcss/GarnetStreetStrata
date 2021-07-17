import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

export interface MessageProps {
  body: string;
}

export class Message extends ValueObject<MessageProps> {
  static create(props: MessageProps): Result<Message> {
    if (!props.body) {
      return Result.fail('The message body is empty or not specified');
    }
    return Result.ok(new Message(props));
  }
}
