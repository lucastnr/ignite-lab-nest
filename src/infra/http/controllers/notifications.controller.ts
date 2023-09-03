import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { SendNotification } from '@app/use-cases/send-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationViewModel } from './view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Get('count/from/:id')
  async countFromRecipient(
    @Param('id') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:id')
  async getFromRecipient(@Param('id') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
