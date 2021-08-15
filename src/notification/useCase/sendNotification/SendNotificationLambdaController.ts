import { SendNotification } from './SendNotification';
import {
  BaseLambdaHttpController,
  HttpControllerRequestEvent,
  HttpControllerResult,
} from '../../../shared/useCase/BaseLambdaHttpController';
import { Result } from '../../../shared/core/Result';
import { MessageDTO } from '../../dtos/MessageDTO';
import { SendNotificationMessageBodyError } from './SendNotificationErrors';

interface SendNotificationRequestDTO {
  notification: {
    messages: MessageDTO[];
  };
}

export class SendNotificationLambdaController extends BaseLambdaHttpController<SendNotificationRequestDTO> {
  constructor(private readonly useCase: SendNotification) {
    super();
  }

  protected parseRequest(event: HttpControllerRequestEvent): Result<SendNotificationRequestDTO> {
    const body = event.body as SendNotificationRequestDTO;
    if (!body) return Result.fail('Must specify a body');
    const messages = body.notification?.messages;
    if (!Array.isArray(messages) || messages.length <= 0)
      return Result.fail('.notification.messages must have at least one message');
    const nullMessageIndex = messages.findIndex((message) => !message);
    if (nullMessageIndex >= 0) return Result.fail(`.notification.messages[${nullMessageIndex}] is null`);
    return Result.ok(body);
  }

  protected async executeRequest(request: SendNotificationRequestDTO): Promise<HttpControllerResult> {
    const result = await this.useCase.execute({ messages: request.notification.messages });
    if (result.isHappy()) return this.ok();
    switch (result.value.constructor) {
      case SendNotificationMessageBodyError:
        return this.badRequest(result.value.message);
      default:
        return this.fail(result.value.message);
    }
  }
}
