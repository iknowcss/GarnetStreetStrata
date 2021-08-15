import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { UnitNumber } from './UnitNumber';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';
import { ContactMethods } from './ContactMethod';

export interface CreateResidentProps {
  unitNumber: UnitNumber;
}

export interface ResidentProps extends CreateResidentProps {
  contactMethods: ContactMethods;
}

export class Resident extends Entity<ResidentProps> {
  static create(props: CreateResidentProps): Result<Resident> {
    return Result.ok(new Resident({ ...props, contactMethods: ContactMethods.create() }));
  }

  static hydrate(props: ResidentProps, id: UniqueEntityID): Result<Resident> {
    return Result.ok(new Resident(props, id));
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get unitNumber(): UnitNumber {
    return this.props.unitNumber;
  }

  get contactMethods(): ContactMethods {
    return this.props.contactMethods;
  }
}
