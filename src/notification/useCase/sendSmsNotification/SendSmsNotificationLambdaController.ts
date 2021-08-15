import { SendSmsNotification } from './SendSmsNotification';
import {
  BaseLambdaHttpController,
  HttpControllerRequestEvent,
  HttpControllerResult,
} from '../../../shared/useCase/BaseLambdaHttpController';

export class SendSmsNotificationLambdaController extends BaseLambdaHttpController {
  constructor(private readonly useCase: SendSmsNotification) {
    super();
  }

  protected executeImpl(event: HttpControllerRequestEvent): Promise<HttpControllerResult> {
    event.toString();
    return this.ok();
  }
}
