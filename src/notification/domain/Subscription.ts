import { Result } from '../../shared/core/Result';
import { Entity } from '../../shared/domain/Entity';
import { Resident } from './Resident';
import { WatchedList } from '../../shared/domain/WatchedList';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { ContactDetails } from './ContactDetails';

export interface SubscriptionProps {
  resident: Resident;
  contactDetails: ContactDetails<any>;
}

export class Subscription extends Entity<SubscriptionProps> {
  static create(props: SubscriptionProps): Result<Subscription> {
    return Result.ok(new Subscription(props));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get resident(): Resident {
    return this.props.resident;
  }

  get contactDetails(): ContactDetails<any> {
    return this.props.contactDetails;
  }
}

export class Subscriptions extends WatchedList<Subscription> {
  static create(subscriptions?: Subscription[]): Result<Subscriptions> {
    return Result.ok(new Subscriptions(subscriptions));
  }

  compareItems(a: Subscription, b: Subscription): boolean {
    return a.id.equals(b.id);
  }
}
