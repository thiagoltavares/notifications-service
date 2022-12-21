import { makeNotification } from '@test/factory/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found';
import { ReadNotification } from './read-notification';

const notificationsRepository = new InMemoryNotificationsRepository();

describe('Read Notification', () => {
  it('should be able to read notification', async () => {
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not able to read a non existing notification', async () => {
    const readNotification = new ReadNotification(notificationsRepository);
    expect(async () => {
      return await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
