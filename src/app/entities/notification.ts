import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationData {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private readonly _id: string;
  private data: NotificationData;

  constructor(
    data: Replace<
      NotificationData,
      { createdAt?: NotificationData['createdAt'] }
    >,
  ) {
    this._id = randomUUID();
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): NotificationData['recipientId'] {
    return this.data.recipientId;
  }

  public set recipientId(value: NotificationData['recipientId']) {
    this.data.recipientId = value;
  }

  public get content(): NotificationData['content'] {
    return this.data.content;
  }

  public set content(value: NotificationData['content']) {
    this.data.content = value;
  }

  public get category(): NotificationData['category'] {
    return this.data.category;
  }

  public set category(value: NotificationData['category']) {
    this.data.category = value;
  }

  public get readAt(): NotificationData['readAt'] {
    return this.data.readAt;
  }

  public set readAt(value: Exclude<NotificationData['readAt'], undefined>) {
    this.data.readAt = value;
  }

  public get createdAt(): NotificationData['createdAt'] {
    return this.data.createdAt;
  }
}
