import { PhoneNumber } from './PhoneNumber';
import { Result } from '../../shared/core/Result';
import { MessageType } from './Message';
import { ContactMethod } from './ContactMethod';

export interface SmsContactMethodInfo {
  mobileNumber: PhoneNumber;
}

export class SmsContactMethod extends ContactMethod<SmsContactMethodInfo> {
  static create(info: SmsContactMethodInfo): Result<SmsContactMethod> {
    return Result.ok(new SmsContactMethod({ info, type: MessageType.SMS }));
  }

  infoToJSON(): string {
    return JSON.stringify({ mobileNumber: this.props.info.mobileNumber.number });
  }

  get mobileNumber(): PhoneNumber {
    return this.props.info.mobileNumber;
  }
}
