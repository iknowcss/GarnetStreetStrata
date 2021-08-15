import AWS from 'aws-sdk';
import { ResidentGateway } from '../ResidentGateway';
import { Resident } from '../../domain/Resident';

export class DynamoDBResidentGateway implements ResidentGateway {
  constructor(private readonly ddb: AWS.DynamoDB) {}

  async save(resident: Resident): Promise<void> {
    await this.ddb
      .putItem({
        TableName: 'Resident',
        Item: {
          Id: { S: resident.id.toValue() },
          UnitNumber: { N: resident.unitNumber.value },
          ContactMethods: {
            L: resident.contactMethods
              .getItems()
              .map((method) => ({ M: { Type: { S: method.type }, Info: { S: method.infoToJSON() } } })),
          },
        },
      })
      .promise();
  }

  async getResidentsWithSubscription(): Promise<Resident[]> {}
}
