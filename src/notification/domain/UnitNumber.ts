import { ValueObject } from '../../shared/domain/ValueObject';
import { Result } from '../../shared/core/Result';

export interface UnitNumberProps {
  value: string;
}

export class UnitNumber extends ValueObject<UnitNumberProps> {
  static create(value: string | number): Result<UnitNumber> {
    const parsed = typeof value === 'number' ? value : parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 51) {
      return Result.ok(
        new UnitNumber({
          value: parsed.toString(),
        }),
      );
    }
    return Result.fail(`Invalid unit number "${value}"`);
  }

  get value(): string {
    return this.props.value;
  }
}
