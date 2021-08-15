import { APIGatewayProxyEventV2, APIGatewayEventRequestContext } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { sendNotificationLambdaController } from '../useCase/sendNotification';

const handler = async (event: APIGatewayProxyEventV2, context: APIGatewayEventRequestContext): Promise<any> => {
  switch (event?.routeKey) {
    case 'POST /v1/notifications':
      return sendNotificationLambdaController.execute(event, context);
    default:
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: '{"error":"Not found"}',
        headers: { 'Content-Type': 'application/json' },
      };
  }
};

export { handler };
