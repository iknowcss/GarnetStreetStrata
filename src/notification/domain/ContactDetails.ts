import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';
import { PhoneNumber } from './PhoneNumber';

export enum ContactDetailsType {
  SMS = 'SMS',
}

export interface ContactDetailsProps {
  type: ContactDetailsType;
}

export class ContactDetails<TProps> extends ValueObject<ContactDetailsProps & Omit<TProps, 'type'>> {
  get type(): ContactDetailsType {
    return this.props.type;
  }
}

export interface SmsContactDetailsProps {
  mobileNumber: PhoneNumber;
}

export class SmsContactDetails extends ContactDetails<SmsContactDetailsProps> {
  static create(props: SmsContactDetailsProps): Result<SmsContactDetails> {
    return Result.ok(new SmsContactDetails({ ...props, type: ContactDetailsType.SMS }));
  }

  get mobileNumber(): PhoneNumber {
    return this.props.mobileNumber;
  }
}
