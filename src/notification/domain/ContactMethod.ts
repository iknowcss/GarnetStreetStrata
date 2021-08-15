import { ValueObject } from '../../shared/domain/ValueObject';
import { MessageType } from './Message';
import { WatchedList } from '../../shared/domain/WatchedList';

export interface ContactMethodProps<InfoType = any> {
  type: MessageType;
  info: InfoType;
}

export abstract class ContactMethod<InfoType = any> extends ValueObject<ContactMethodProps<InfoType>> {
  get type(): MessageType {
    return this.props.type;
  }

  get info(): InfoType {
    return this.props.info;
  }

  abstract infoToJSON(): string;
}

export class ContactMethods extends WatchedList<ContactMethod> {
  private constructor(contactMethods: ContactMethod[]) {
    super(contactMethods);
  }

  compareItems(a: ContactMethod, b: ContactMethod): boolean {
    return a.equals(b);
  }

  public static create(contactMethods?: ContactMethod[]): ContactMethods {
    return new ContactMethods(contactMethods || []);
  }
}
