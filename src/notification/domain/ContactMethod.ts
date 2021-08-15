import { ValueObject } from '../../shared/domain/ValueObject';
import { MessageType } from './Message';
import { WatchedList } from '../../shared/domain/WatchedList';

export interface ContactMethodProps {
  type: MessageType;
}

export abstract class ContactMethod<TProps = any> extends ValueObject<ContactMethodProps & Omit<TProps, 'type'>> {
  get type(): MessageType {
    return this.props.type;
  }
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
