import { Resident } from '../Resident';
import { mockContactDetails } from '../../../shared/test/mock';
import { UnitNumber } from '../UnitNumber';

describe('Resident', () => {
  it('creates a resident', () => {
    const contactDetails = mockContactDetails();
    const unitNumber = UnitNumber.create(30).getValue();
    const resident = Resident.create({ contactDetails, unitNumber }).getValue();
    expect(resident.contactDetails).toEqual(contactDetails);
    expect(resident.unitNumber).toEqual(unitNumber);
    expect(resident.subscriptions.getItems()).toEqual([]);
  });
});
