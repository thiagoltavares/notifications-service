import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/Notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notification', async () => {
    const countNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = new Notification({
      category: 'social',
      content: new Content('This is a notification 1'),
      recipientId: 'example-recipient-id',
    });

    const notification2 = new Notification({
      category: 'social',
      content: new Content('This is a notification 2'),
      recipientId: 'example-recipient-id',
    });

    const notification3 = new Notification({
      category: 'social',
      content: new Content('This is a notification 3'),
      recipientId: 'example-recipient-id-2',
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countNotification.execute({
      recipientId: 'example-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
