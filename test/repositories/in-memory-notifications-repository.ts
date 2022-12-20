import { NotificationsRepository } from '@application/repository/notifications-repository';
import { Notification } from '@application/entities/notification/notification';
import { NotificationNotFound } from '@application/use-cases/errors/notifications-not-found';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    return notification;
  }
  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (index < 0) {
      throw new NotificationNotFound();
    }

    this.notifications[index] = notification;
  }
}
