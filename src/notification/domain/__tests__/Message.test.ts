import { Message, SmsMessage } from '../Message';

describe('Message', () => {
  it('creates', () => {
    const message = SmsMessage.create({ body: 'This is a test' }).getValue();
    expect(message.body).toEqual('This is a test');
  });

  it('fails on invalid body', () => {
    expect(SmsMessage.create({ body: '' }).isFailure).toBe(true);
    expect(SmsMessage.create({} as any).isFailure).toBe(true);
  });
});
