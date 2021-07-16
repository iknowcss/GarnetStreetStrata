import {Entity} from "../../domain/Entity";

export interface ResidentProps {}

export class Resident extends Entity<ResidentProps> {
  static create(props: ResidentProps) {
    return new Resident(props);
  }
}
