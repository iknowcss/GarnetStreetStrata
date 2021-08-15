import { UseCase } from '../../../shared/core/UseCase';
import { NotificationDTO } from '../../dtos/NotificationDTO';
import { NotificationGateway } from '../../gateways/NotificationGateway';
import { Either, happy, Result, sad } from '../../../shared/core/Result';
import { Notification } from '../../domain/Notification';
import { SmsMessage } from '../../domain/Message';
import {
  SendNotificationCreateNotificationError,
  SendNotificationMessageBodyError,
  SendNotificationSendError,
} from './SendSmsNotificationErrors';

export interface SendSmsNotificationRequest {
  messageBody: string;
}

export type SendNotificationResponse = Either<
  SendNotificationMessageBodyError | SendNotificationCreateNotificationError | SendNotificationSendError,
  Result<NotificationDTO>
>;

export class SendSmsNotification implements UseCase<SendSmsNotificationRequest, SendNotificationResponse> {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  async execute(request: SendSmsNotificationRequest): Promise<SendNotificationResponse> {
    // Create the SmsMessage
    const smsMessageResult = SmsMessage.create({ body: request.messageBody });
    if (smsMessageResult.isFailure) {
      return sad(new SendNotificationMessageBodyError(smsMessageResult.errorValue().toString()));
    }
    const smsMessage = smsMessageResult.getValue();

    // Create the Notification containing the SmsMessage
    const notificationResult = Notification.create({ messages: [smsMessage] });
    if (notificationResult.isFailure) {
      return sad(new SendNotificationCreateNotificationError(notificationResult.errorValue().toString()));
    }
    const notification = notificationResult.getValue();

    // Send the Notification
    try {
      await this.notificationGateway.send(notification);
    } catch (error) {
      return sad(new SendNotificationSendError(error.message));
    }

    return happy(Result.ok());
  }
}
