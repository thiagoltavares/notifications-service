import { Content } from '@application/entities/notification/content';
import { Notification } from '@application/entities/notification/Notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notifications-not-found';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Cancel Notification', () => {
  it('should be able to cancel notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = new Notification({
      category: 'social',
      content: new Content('This is a notification'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not able to cancel a non existing notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);
    expect(async () => {
      return await cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
