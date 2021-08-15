import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';
import { PhoneNumber } from './PhoneNumber';
import { MessageType } from './Message';

export interface ContactMethodProps {
  type: MessageType;
}

export abstract class ContactMethod<TProps> extends ValueObject<ContactMethodProps & Omit<TProps, 'type'>> {
  get type(): MessageType {
    return this.props.type;
  }
}

export interface SmsContactMethodProps {
  mobileNumber: PhoneNumber;
}

export class SmsContactMethod extends ContactMethod<SmsContactMethodProps> {
  static create(props: SmsContactMethodProps): Result<SmsContactMethod> {
    return Result.ok(new SmsContactMethod({ ...props, type: MessageType.SMS }));
  }

  get mobileNumber(): PhoneNumber {
    return this.props.mobileNumber;
  }
}
