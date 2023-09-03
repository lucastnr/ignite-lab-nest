import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Send Notification', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: '1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: '2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '1',
    });

    expect(count).toEqual(2);
  });
});
