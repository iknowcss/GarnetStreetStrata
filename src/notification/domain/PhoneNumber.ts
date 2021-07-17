import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

const VALID_PHONE_NUMBER_REGEX = /^\+614\d{8}$/;

export interface PhoneNumberProps {
  number: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  static create(props: PhoneNumberProps): Result<PhoneNumber> {
    const normalized = '+' + props.number.replace(/\D/g, '').replace(/^0(\d{9})$/, '61$1');
    if (!VALID_PHONE_NUMBER_REGEX.test(normalized)) {
      return Result.fail(`number "${normalized}" is not valid`);
    }
    return Result.ok(new PhoneNumber({ number: normalized }));
  }

  get number(): string {
    return this.props.number;
  }
}
