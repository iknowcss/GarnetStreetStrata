import { UseCase } from '../../../shared/core/UseCase';
import { NotificationDTO } from '../../dtos/NotificationDTO';
import { NotificationGateway } from '../../gateways/NotificationGateway';
import { SubscriptionGateway } from '../../gateways/SubscriptionGateway';
import { Either, happy, Result, sad } from '../../../shared/core/Result';
import { Notification } from '../../domain/Notification';
import { MessageType, SmsMessage } from '../../domain/Message';
import {
  SendNotificationCreateNotificationError,
  SendNotificationFetchSubscriptionsError,
  SendNotificationMessageBodyError,
  SendNotificationSendError,
} from './SendSmsNotificationErrors';

export interface SendNotificationRequest {
  messageBody: string;
}

export type SendNotificationResponse = Either<
  | SendNotificationCreateNotificationError
  | SendNotificationFetchSubscriptionsError
  | SendNotificationMessageBodyError
  | SendNotificationSendError,
  Result<NotificationDTO>
>;

export class SendSmsNotification implements UseCase<SendNotificationRequest, SendNotificationResponse> {
  constructor(
    private readonly subscriptionGateway: SubscriptionGateway,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const smsMessageResult = SmsMessage.create({ body: request?.messageBody || '' });
    if (smsMessageResult.isFailure) {
      return sad(new SendNotificationMessageBodyError(smsMessageResult.errorValue().toString()));
    }
    const smsMessage = smsMessageResult.getValue();

    const notificationResult = Notification.create({ messages: [smsMessage] });
    if (notificationResult.isFailure) {
      return sad(new SendNotificationCreateNotificationError(notificationResult.errorValue().toString()));
    }
    const notification = notificationResult.getValue();

    let subscriptions;
    try {
      subscriptions = await this.subscriptionGateway.getSubscriptions({ type: MessageType.SMS });
    } catch (error) {
      return sad(new SendNotificationFetchSubscriptionsError(error.message));
    }

    try {
      await this.notificationGateway.send(notification, subscriptions);
    } catch (error) {
      return sad(new SendNotificationSendError(error.message));
    }

    return happy(Result.ok());
  }
}
