import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private _notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id,
    );

    if (notificationIndex === -1) {
      throw new NotificationNotFound();
    }

    this.notifications[notificationIndex] = notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );

    return notifications;
  }

  get notifications(): Notification[] {
    return this._notifications;
  }
}
