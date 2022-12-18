import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  const data = {
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    recipientId: 'recipient-id',
  };

  const content = new Notification(data);
  it('should be able to create a notification', () => {
    expect(content).toBeTruthy();
    expect(content.category).toEqual(data.category);
  });

  it('should match all properties', () => {
    expect(content.category).toEqual(data.category);
  });
});
