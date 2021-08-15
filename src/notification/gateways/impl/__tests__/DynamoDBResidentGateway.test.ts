import { DynamoDBResidentGateway } from '../DynamoDBResidentGateway';
import { DynamoDBManager } from '../../../../shared/test/DynamoDBManager';
import { testPhoneNumber, testResident, testUnitNumber } from '../../../../shared/test/mock';
import { ContactMethods } from '../../../domain/ContactMethod';
import { SmsContactMethod } from '../../../domain/SmsContactMethod';

describe('DynamoDBResidentGateway', () => {
  const dbManager = new DynamoDBManager();
  const residentGateway = new DynamoDBResidentGateway(dbManager.ddb);

  beforeEach(async () => {
    jest.resetAllMocks();
    await dbManager.reset();
  });

  describe('save', () => {
    it('saves a new resident', async () => {
      const resident = testResident(
        {
          unitNumber: testUnitNumber(40),
          contactMethods: ContactMethods.create([
            SmsContactMethod.create({ mobileNumber: testPhoneNumber('+61400800900') }).getValue(),
          ]),
        },
        'unit-40-resident',
      );
      await residentGateway.save(resident);

      const getItemResult = await dbManager.ddb
        .getItem({ TableName: 'Resident', Key: { Id: { S: 'unit-40-resident' } } })
        .promise();
      const smsContactMethod = resident.contactMethods.getItems()[0];
      expect(getItemResult.Item).toMatchObject({
        Id: { S: 'unit-40-resident' },
        UnitNumber: { N: '40' },
        ContactMethods: { L: [{ M: { Type: { S: 'SMS' }, Info: { S: smsContactMethod.infoToJSON() } } }] },
      });
    });
  });

  describe('getResidentsWithSubscription', () => {});
});
