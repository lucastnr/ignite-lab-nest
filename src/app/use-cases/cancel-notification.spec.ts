import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);

    await cancelNotification.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() =>
      cancelNotification.execute({ notificationId: 'id-here' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
