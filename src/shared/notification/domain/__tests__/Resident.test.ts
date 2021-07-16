import {Resident} from "../Resident";

describe('Resident', () => {
  it('creates a resident', () => {
    const resident = Resident.create({ contactDetails: [] });
    expect(resident.isSuccess).toBe(true);
  });
});
