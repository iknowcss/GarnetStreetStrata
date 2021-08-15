import { SmsMessage } from '../Message';

describe('Message', () => {
  it('creates', () => {
    const message = SmsMessage.create({ content: { body: 'This is a test' } }).getValue();
    expect(message.content.body).toEqual('This is a test');
  });

  it('fails on invalid body', () => {
    expect(SmsMessage.create({ content: { body: '' } }).isFailure).toBe(true);
    expect(SmsMessage.create({} as any).isFailure).toBe(true);
  });
});