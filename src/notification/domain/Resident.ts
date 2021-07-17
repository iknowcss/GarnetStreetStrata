import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { ContactDetails } from './ContactDetails';
import { UnitNumber } from './UnitNumber';
import { Subscriptions } from './Subscription';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export interface CreateResidentProps {
  contactDetails: ContactDetails;
  unitNumber: UnitNumber;
}

export interface ResidentProps extends CreateResidentProps {
  subscriptions: Subscriptions;
}

export class Resident extends Entity<ResidentProps> {
  static create(props: CreateResidentProps): Result<Resident> {
    return Result.ok(new Resident({ ...props, subscriptions: Subscriptions.create().getValue() }));
  }

  static hydrate(props: ResidentProps, id: UniqueEntityID): Result<Resident> {
    return Result.ok(new Resident(props, id));
  }

  get contactDetails(): ContactDetails {
    return this.props.contactDetails;
  }

  get unitNumber(): UnitNumber {
    return this.props.unitNumber;
  }

  get subscriptions(): Subscriptions {
    return this.props.subscriptions;
  }
}
