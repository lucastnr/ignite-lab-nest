import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);

    await readNotification.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() =>
      readNotification.execute({ notificationId: 'id-here' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
