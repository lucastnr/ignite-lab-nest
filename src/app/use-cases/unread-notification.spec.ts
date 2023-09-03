import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);

    await unreadNotification.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });
  it('should not be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() =>
      unreadNotification.execute({ notificationId: 'id-here' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
