import { UseCase } from '../../../shared/core/UseCase';
import { Either, happy, Result, sad } from '../../../shared/core/Result';
import { Notification } from '../../domain/Notification';
import { SmsMessage } from '../../domain/Message';
import {
  SendSmsNotificationCreateNotificationError,
  SendSmsNotificationGetResidentsError,
  SendSmsNotificationMessageBodyError,
  SendSmsNotificationSendError,
} from './SendSmsNotificationErrors';
import { ResidentGateway } from '../../gateways/ResidentGateway';
import { NotificationGateway } from '../../gateways/NotificationGateway';

export interface SendSmsNotificationRequest {
  messageBody: string;
}

export type SendNotificationResponse = Either<
  | SendSmsNotificationMessageBodyError
  | SendSmsNotificationCreateNotificationError
  | SendSmsNotificationGetResidentsError
  | SendSmsNotificationSendError,
  Result<void>
>;

export class SendSmsNotification implements UseCase<SendSmsNotificationRequest, SendNotificationResponse> {
  constructor(
    private readonly notificationGateway: NotificationGateway,
    private readonly residentGateway: ResidentGateway,
  ) {}

  async execute(request: SendSmsNotificationRequest): Promise<SendNotificationResponse> {
    // Create the SmsMessage
    const smsMessageResult = SmsMessage.create({ body: request.messageBody });
    if (smsMessageResult.isFailure) {
      return sad(new SendSmsNotificationMessageBodyError(smsMessageResult.errorValue().toString()));
    }
    const smsMessage = smsMessageResult.getValue();

    // Get the residents who will receive the message
    let residents;
    try {
      residents = await this.residentGateway.getResidentsWithSubscription();
    } catch (error) {
      return sad(new SendSmsNotificationGetResidentsError(error.message));
    }

    // Create the Notification containing the SmsMessage
    const notificationResult = Notification.create({ residents, messages: [smsMessage] });
    if (notificationResult.isFailure) {
      return sad(new SendSmsNotificationCreateNotificationError(notificationResult.errorValue().toString()));
    }
    const notification = notificationResult.getValue();

    // Send the Notification
    try {
      await this.notificationGateway.send(notification);
    } catch (error) {
      return sad(new SendSmsNotificationSendError(error.message));
    }

    return happy(Result.ok());
  }
}
