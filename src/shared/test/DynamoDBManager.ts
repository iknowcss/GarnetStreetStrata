import AWS from 'aws-sdk';

export class DynamoDBManager {
  public readonly ddb: AWS.DynamoDB;

  constructor() {
    const endpoint = new AWS.Endpoint('http://localhost:4566');
    this.ddb = new AWS.DynamoDB({ endpoint, region: 'ap-southeast-2' });
  }

  async reset() {
    const listTablesResult = await this.ddb.listTables().promise();
    await Promise.all(
      (listTablesResult.TableNames || []).map((tableName) => this.ddb.deleteTable({ TableName: tableName }).promise()),
    );
    await Promise.all([
      this.ddb
        .createTable({
          TableName: 'Resident',
          KeySchema: [{ AttributeName: 'Id', KeyType: 'HASH' }],
          AttributeDefinitions: [{ AttributeName: 'Id', AttributeType: 'S' }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        })
        .promise(),
    ]);
  }
}
