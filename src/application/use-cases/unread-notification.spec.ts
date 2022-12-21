import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found';
import { UnreadNotification } from './unread-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Unread Notification', () => {
  it('should be able to unread notification', async () => {
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const notification = makeNotification();
    notification.read();

    await notificationsRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not able to unread a non existing notification', async () => {
    const unreadNotification = new UnreadNotification(notificationsRepository);
    expect(async () => {
      return await unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
