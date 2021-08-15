import { ResidentGateway } from '../ResidentGateway';
import { Resident } from '../../domain/Resident';

export class MockResidentGateway implements ResidentGateway {
  async getResidentsWithSubscription(): Promise<Resident[]> {
    throw new Error('Not implemented');
  }
}
