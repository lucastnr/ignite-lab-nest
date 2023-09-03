import { Content } from '@app/entities/content';
import { Notification, NotificationData } from '@app/entities/notification';

export function makeNotification(override: Partial<NotificationData> = {}) {
  return new Notification({
    recipientId: 'recipient-id',
    category: 'category',
    content: new Content('Notification content'),
    ...override,
  });
}
