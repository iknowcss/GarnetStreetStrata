import { Resident } from '../domain/Resident';
import { Subscription } from '../domain/Subscription';

export interface SubscriptionGateway {
  save(resident: Resident): Promise<void>;
  getSubscriptions({ type: MessageType }): Promise<Subscription[]>;
}
