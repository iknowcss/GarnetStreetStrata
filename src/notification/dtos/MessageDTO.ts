import { MessageType } from '../domain/Message';

export interface MessageDTO<ContentType = any> {
  type: MessageType;
  content: ContentType;
}
