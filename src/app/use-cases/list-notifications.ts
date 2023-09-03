import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute() {
    const notifications = await this.notificationsRepository.list();
    return { notifications };
  }
}
