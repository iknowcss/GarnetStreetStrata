import { ContactDetails } from '../../notification/domain/ContactDetails';
import { PhoneNumber } from '../../notification/domain/PhoneNumber';
import { Message } from '../../notification/domain/Message';

export const mockPhoneNumber = (): PhoneNumber => PhoneNumber.create({ number: '+61400800900' }).getValue();

export const mockContactDetails = (): ContactDetails =>
  ContactDetails.create({ mobileNumber: mockPhoneNumber() }).getValue();

export const mockMessage = (): Message => Message.create({ body: 'This is a test' }).getValue();
