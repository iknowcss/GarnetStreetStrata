import {PhoneNumber} from "../PhoneNumber";

describe('PhoneNumber', () => {
  it('creates a valid phone number', () => {
    expect(PhoneNumber.create({ number: '+61400800900' }).getValue().number).toEqual('+61400800900');
  });

  it('normalizes a number', () => {
    expect(PhoneNumber.create({ number: '61 400 800 900' }).getValue().number).toEqual('+61400800900');
  });

  it('normalizes a local number', () => {
    expect(PhoneNumber.create({ number: '0400 800 900' }).getValue().number).toEqual('+61400800900');
  });

  it('does not create an invalid phone number', () => {
    expect(PhoneNumber.create({ number: '+18054003600' }).isFailure).toBe(true);
  });
});
