import { SendNotification } from './SendNotification';
import {
  BaseLambdaHttpController,
  HttpControllerRequestEvent,
  HttpControllerResult,
} from '../../../shared/useCase/BaseLambdaHttpController';

export class SendNotificationLambdaController extends BaseLambdaHttpController {
  constructor(private readonly useCase: SendNotification) {
    super();
  }

  protected executeImpl(event: HttpControllerRequestEvent): Promise<HttpControllerResult> {
    event.toString();
    return this.ok();
  }
}
