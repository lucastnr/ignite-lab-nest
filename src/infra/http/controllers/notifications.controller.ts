import { SendNotification } from '@app/use-cases/send-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationViewModel } from './view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
