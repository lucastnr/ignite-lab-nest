import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ListNotifications } from './list-notifications';

describe('List Notifications', () => {
  it('should be able to list all notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const listNotifications = new ListNotifications(notificationsRepository);

    const notification1 = makeNotification();
    notificationsRepository.create(notification1);
    const notification2 = makeNotification();
    notificationsRepository.create(notification2);

    const { notifications } = await listNotifications.execute();
    expect(notifications).toEqual([notification1, notification2]);
  });
});
