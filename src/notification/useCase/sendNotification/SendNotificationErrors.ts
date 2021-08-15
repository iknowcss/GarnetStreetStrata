import { UseCaseError } from '../../../shared/core/UseCaseError';

export class SendNotificationMessageBodyError extends UseCaseError {
  constructor(reason: string) {
    super(`Message body is invalid: ${reason}`);
  }
}

export class SendNotificationCreateNotificationError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to create notification: ${reason}`);
  }
}

export class SendNotificationGetResidentsError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to get residents: ${reason}`);
  }
}

export class SendNotificationSendError extends UseCaseError {
  constructor(reason: string) {
    super(`Failed to send notification: ${reason}`);
  }
}
