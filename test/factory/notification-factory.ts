import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/Notification';

type Override = Partial<Notification>;

export function makeNotification(override?: Override) {
  const notification = new Notification({
    category: 'social',
    content: new Content('This is a notification'),
    recipientId: 'example-recipient-id',
    ...override,
  });

  return notification;
}
