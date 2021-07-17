import { Message } from '../Message';

describe('Message', () => {
  it('creates', () => {
    const message = Message.create({ body: 'This is a test' }).getValue();
    expect(message.body).toEqual('This is a test');
  });

  it('fails on invalid body', () => {
    expect(Message.create({ body: '' }).isFailure).toBe(true);
    expect(Message.create({} as any).isFailure).toBe(true);
  });
});
