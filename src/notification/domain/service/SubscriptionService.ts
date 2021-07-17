import { Resident } from '../Resident';
import { ContactDetails } from '../ContactDetails';
import { Either, happy, Result, sad } from '../../../shared/core/Result';
import { Subscription } from '../Subscription';

export class SubscriptionCreated extends Result<void> {
  constructor() {
    super(true);
  }
}

export class SubscriptionAlreadyExists extends Result<void> {
  constructor() {
    super(true);
  }
}

export class SubscriptionService {
  subscribeResident(
    resident: Resident,
    contactDetails: ContactDetails<any>,
  ): Either<Result<string>, SubscriptionCreated | SubscriptionAlreadyExists> {
    const subscriptionResult = Subscription.create({ resident, contactDetails });
    if (subscriptionResult.isFailure) {
      return sad(Result.fail<string>(`Failed to create subscription: ${subscriptionResult.error}`));
    }

    const matchingSubscription = resident.subscriptions
      .getItems()
      .find((item) => item.contactDetails.equals(contactDetails));
    if (!matchingSubscription) {
      resident.subscriptions.add(subscriptionResult.getValue());
      return happy(new SubscriptionCreated());
    }
    return happy(new SubscriptionAlreadyExists());
  }
}
