import { UnitNumber } from '../UnitNumber';

describe('UnitNumber', () => {
  it('creates a valid unit number from an integer', () => {
    expect(UnitNumber.create(30).getValue().value).toBe('30');
  });

  it('creates a valid unit number from a string', () => {
    expect(UnitNumber.create('30').getValue().value).toBe('30');
  });

  it('does not create an invalid unit number', () => {
    expect(UnitNumber.create(0).isFailure).toBe(true);
    expect(UnitNumber.create(52).isFailure).toBe(true);
    expect(UnitNumber.create('lulz').isFailure).toBe(true);
    expect(UnitNumber.create(30.5).isFailure).toBe(true);
    expect(UnitNumber.create('0').isFailure).toBe(true);
    expect(UnitNumber.create('52').isFailure).toBe(true);
  });
});
