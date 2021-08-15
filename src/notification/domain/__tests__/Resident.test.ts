import { Resident } from '../Resident';
import { UnitNumber } from '../UnitNumber';

describe('Resident', () => {
  it('creates a resident', () => {
    const unitNumber = UnitNumber.create(30).getValue();
    const resident = Resident.create({ unitNumber }).getValue();
    expect(resident.unitNumber).toEqual(unitNumber);
  });
});
