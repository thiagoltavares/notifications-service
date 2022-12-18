import { Notification } from '../entities/notification/notification';
import { NotificationsRepository } from '../repository/notifications-repository';

import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

class postgresRepository extends NotificationsRepository {
  async create(notification: Notification) {
    notifications.push(notification);
  }
}

const notificationsRepository = new postgresRepository();

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'This is a notification',
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(1);
  });
});
