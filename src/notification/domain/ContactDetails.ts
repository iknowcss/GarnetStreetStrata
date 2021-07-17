import { ValueObject } from '../../shared/domain/ValueObject';
import { PhoneNumber } from './PhoneNumber';
import { Result } from '../../shared/core/Result';

export interface ContactDetailsProps {
  mobileNumber: PhoneNumber;
}

export class ContactDetails extends ValueObject<ContactDetailsProps> {
  static create(props: ContactDetailsProps): Result<ContactDetails> {
    return Result.ok(new ContactDetails(props));
  }
}
