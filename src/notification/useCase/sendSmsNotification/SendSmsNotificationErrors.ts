import { UseCaseError } from '../../../shared/core/UseCaseError';

export class SendSmsNotificationMessageBodyError extends UseCaseError {
  constructor(reason: string) {
    super(`Message body is invalid: ${reason}`);
  }
}

export class SendSmsNotificationCreateNotificationError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to create notification: ${reason}`);
  }
}

export class SendSmsNotificationGetResidentsError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to get residents: ${reason}`);
  }
}

export class SendSmsNotificationSendError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to send notification: ${reason}`);
  }
}
