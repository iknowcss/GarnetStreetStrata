import { Resident } from '../domain/Resident';

export interface ResidentGateway {
  save(resident: Resident): Promise<void>;
  getAllResidents(): Promise<Resident[]>;
}
