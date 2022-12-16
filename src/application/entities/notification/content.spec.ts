import Content from './content';

describe('Notification Content', () => {
  it('should be able to create a content', () => {
    const content = new Content('Acabou de receber um pedido de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification with less than 5 characters', () => {
    expect(() => new Content('a'.repeat(4))).toThrow();
  });

  it('should not be able to create a notification with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
