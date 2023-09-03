import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): RawNotification {
    return {
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt || null,
      canceledAt: notification.canceledAt || null,
      createdAt: notification.createdAt,
      id: notification.id,
    };
  }

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        recipientId: raw.recipientId,
        content: new Content(raw.content),
        category: raw.category,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
