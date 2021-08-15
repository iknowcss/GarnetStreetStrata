import { PhoneNumber } from './PhoneNumber';
import { Result } from '../../shared/core/Result';
import { MessageType } from './Message';
import { ContactMethod } from './ContactMethod';

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
