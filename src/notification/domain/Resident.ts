import {Entity} from "../../shared/domain/Entity";
import {Result} from "../../shared/core/Result";
import {ContactDetails} from "./ContactDetails";
import {UnitNumber} from "./UnitNumber";

export interface ResidentProps {
  contactDetails: ContactDetails;
  unitNumber: UnitNumber;
}

export class Resident extends Entity<ResidentProps> {
  static create(props: ResidentProps): Result<Resident> {
    return Result.ok(new Resident(props));
  }

  get contactDetails(): ContactDetails {
    return this.props.contactDetails;
  }

  get unitNumber(): UnitNumber {
    return this.props.unitNumber;
  }
}
