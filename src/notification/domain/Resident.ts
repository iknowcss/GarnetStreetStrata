import { Entity } from '../../shared/domain/Entity';
import { Result } from '../../shared/core/Result';
import { UnitNumber } from './UnitNumber';
import { UniqueEntityID } from '../../shared/domain/UniqueEntityID';

export interface CreateResidentProps {
  unitNumber: UnitNumber;
}

export type ResidentProps = CreateResidentProps;

export class Resident extends Entity<ResidentProps> {
  static create(props: CreateResidentProps): Result<Resident> {
    return Result.ok(new Resident({ ...props }));
  }

  static hydrate(props: ResidentProps, id: UniqueEntityID): Result<Resident> {
    return Result.ok(new Resident(props, id));
  }

  get unitNumber(): UnitNumber {
    return this.props.unitNumber;
  }
}
