import { Resident } from '../domain/Resident';

export interface ResidentGateway {
  getResidentsWithSubscription(): Promise<Resident[]>;
}
