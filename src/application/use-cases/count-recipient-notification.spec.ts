import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Count Recipient Notification', () => {
  it('should be able to count recipient notification', async () => {
    const countNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification1 = makeNotification({
      recipientId: 'example-recipient-id-1',
    });
    const notification2 = makeNotification({
      recipientId: 'example-recipient-id-1',
    });
    const notification3 = makeNotification({
      recipientId: 'example-recipient-id-2',
    });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const { count } = await countNotification.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
