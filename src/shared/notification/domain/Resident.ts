import {Entity} from "../../domain/Entity";
import {Result} from "../../core/Result";

export interface ResidentProps {
  contactDetails: any[]
}

export class Resident extends Entity<ResidentProps> {
  static create(props: ResidentProps): Result<Resident> {
    return Result.ok(new Resident(props));
  }
}
