import { SmsContactDetails } from '../../notification/domain/ContactDetails';
import { PhoneNumber } from '../../notification/domain/PhoneNumber';
import { Message } from '../../notification/domain/Message';
import { Resident, ResidentProps } from '../../notification/domain/Resident';
import { UnitNumber } from '../../notification/domain/UnitNumber';
import { Subscriptions } from '../../notification/domain/Subscription';
import { UniqueEntityID } from '../domain/UniqueEntityID';

export const testPhoneNumber = (): PhoneNumber => PhoneNumber.create({ number: '+61400800900' }).getValue();

export const testSmsContactDetails = (): SmsContactDetails =>
  SmsContactDetails.create({ mobileNumber: testPhoneNumber() }).getValue();

export const testMessage = (): Message => Message.create({ body: 'This is a test' }).getValue();

export const testUnitNumber = (): UnitNumber => UnitNumber.create(30).getValue();

export const testResident = (overrides?: Partial<ResidentProps>, id?: string): Resident =>
  Resident.hydrate(
    { unitNumber: testUnitNumber(), subscriptions: Subscriptions.create().getValue(), ...overrides },
    new UniqueEntityID(id || 'test-resident'),
  ).getValue();
