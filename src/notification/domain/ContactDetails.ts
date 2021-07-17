import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';
import { PhoneNumber } from './PhoneNumber';
import { MessageType } from './Message';

export interface ContactDetailsProps {
  type: MessageType;
}

export abstract class ContactDetails<TProps> extends ValueObject<ContactDetailsProps & Omit<TProps, 'type'>> {
  get type(): MessageType {
    return this.props.type;
  }
}

export interface SmsContactDetailsProps {
  mobileNumber: PhoneNumber;
}

export class SmsContactDetails extends ContactDetails<SmsContactDetailsProps> {
  static create(props: SmsContactDetailsProps): Result<SmsContactDetails> {
    return Result.ok(new SmsContactDetails({ ...props, type: MessageType.SMS }));
  }

  get mobileNumber(): PhoneNumber {
    return this.props.mobileNumber;
  }
}
