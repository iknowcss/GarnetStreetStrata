import { ContactMethods } from '../../notification/domain/ContactMethod';
import { SmsContactMethod } from '../../notification/domain/SmsContactMethod';
import { PhoneNumber } from '../../notification/domain/PhoneNumber';
import { SmsMessage } from '../../notification/domain/Message';
import { Resident, ResidentProps } from '../../notification/domain/Resident';
import { UnitNumber } from '../../notification/domain/UnitNumber';
import { UniqueEntityID } from '../domain/UniqueEntityID';

export const testPhoneNumber = (): PhoneNumber => PhoneNumber.create({ number: '+61400800900' }).getValue();

export const testSmsContactMethod = (): SmsContactMethod =>
  SmsContactMethod.create({ mobileNumber: testPhoneNumber() }).getValue();

export const testMessage = (): SmsMessage => SmsMessage.create({ content: { body: 'This is a test' } }).getValue();

export const testUnitNumber = (): UnitNumber => UnitNumber.create(30).getValue();

export const testResident = (overrides?: Partial<ResidentProps>, id?: string): Resident =>
  Resident.hydrate(
    { unitNumber: testUnitNumber(), contactMethods: ContactMethods.create([testSmsContactMethod()]), ...overrides },
    new UniqueEntityID(id || 'test-resident'),
  ).getValue();
