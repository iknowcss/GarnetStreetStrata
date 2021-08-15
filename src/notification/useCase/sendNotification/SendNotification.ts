import { UseCase } from '../../../shared/core/UseCase';
import { Either, happy, Result, sad } from '../../../shared/core/Result';
import { Notification } from '../../domain/Notification';
import { MessageType, SmsMessage, SmsMessageContent, SmsMessageProps } from '../../domain/Message';
import {
  SendNotificationCreateNotificationError,
  SendNotificationGetResidentsError,
  SendNotificationMessageBodyError,
  SendNotificationSendError,
} from './SendNotificationErrors';
import { ResidentGateway } from '../../gateways/ResidentGateway';
import { NotificationGateway } from '../../gateways/NotificationGateway';
import { MessageDTO } from '../../dtos/MessageDTO';

export interface SendNotificationRequest {
  messages: MessageDTO[];
}

export type SendNotificationResponse = Either<
  | SendNotificationMessageBodyError
  | SendNotificationCreateNotificationError
  | SendNotificationGetResidentsError
  | SendNotificationSendError,
  Result<void>
>;

export class SendNotification implements UseCase<SendNotificationRequest, SendNotificationResponse> {
  constructor(
    private readonly notificationGateway: NotificationGateway,
    private readonly residentGateway: ResidentGateway,
  ) {}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const smsMessageDTO = request.messages.find((message) => message.type === MessageType.SMS) as SmsMessageProps;

    // Create the SmsMessage
    const smsMessageResult = SmsMessage.create(smsMessageDTO);
    if (smsMessageResult.isFailure) {
      return sad(new SendNotificationMessageBodyError(smsMessageResult.errorValue().toString()));
    }
    const smsMessage = smsMessageResult.getValue();

    // Get the residents who will receive the message
    let residents;
    try {
      residents = await this.residentGateway.getResidentsWithSubscription();
    } catch (error) {
      return sad(new SendNotificationGetResidentsError(error.message));
    }

    // Create the Notification containing the SmsMessage
    const notificationResult = Notification.create({ residents, messages: [smsMessage] });
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
