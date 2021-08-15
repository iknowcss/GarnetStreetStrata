import { SendNotification } from './SendNotification';
import { notificationGateway, residentGateway } from '../../gateways';
import { SendNotificationLambdaController } from './SendNotificationLambdaController';

const sendNotification = new SendNotification(notificationGateway, residentGateway);
const sendNotificationLambdaController = new SendNotificationLambdaController(sendNotification);

export { sendNotificationLambdaController };
