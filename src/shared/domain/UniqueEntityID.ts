import uuid from 'uuid/v4';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string>{
  constructor (id?: string) {
    super(id ? id : uuid())
  }
}
