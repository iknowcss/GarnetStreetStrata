import AWS from 'aws-sdk';
import { MockNotificationGateway } from './impl/MockNotificationGateway';
import { DynamoDBResidentGateway } from './impl/DynamoDBResidentGateway';

const endpoint = new AWS.Endpoint('http://localhost:4566');
const dynamoDbClient = new AWS.DynamoDB({ endpoint });

const notificationGateway = new MockNotificationGateway();
const residentGateway = new DynamoDBResidentGateway(dynamoDbClient);

export { notificationGateway, residentGateway };
