import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notifications';
import { ListNotifications } from '@app/use-cases/list-notifications';
import { ReadNotification } from '@app/use-cases/read-notification';
import { SendNotification } from '@app/use-cases/send-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    ListNotifications,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
