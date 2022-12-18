import { Notification } from 'src/application/entities/notification/notification';
import { NotificationsRepository } from 'src/application/repository/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
