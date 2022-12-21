import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Get Notification', () => {
  it('should be able to get notification', async () => {
    const getNotification = new GetRecipientNotifications(
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

    const { notifications } = await getNotification.execute({
      recipientId: 'example-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
  });
});
