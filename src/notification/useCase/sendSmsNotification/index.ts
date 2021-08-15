import { SendSmsNotification } from './SendSmsNotification';
import { notificationGateway, residentGateway } from '../../gateways';
import { SendSmsNotificationLambdaController } from './SendSmsNotificationLambdaController';

const sendSmsNotification = new SendSmsNotification(notificationGateway, residentGateway);
const sendSmsNotificationLambdaController = new SendSmsNotificationLambdaController(sendSmsNotification);

export { sendSmsNotificationLambdaController };
