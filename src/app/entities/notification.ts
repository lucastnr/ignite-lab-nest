import { Replace } from '@helpers/Replace';
import { randomUUID } from 'node:crypto';
import { Content } from './content';

export interface NotificationData {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
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
    id?: string,
  ) {
    this._id = id || randomUUID();
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

  public get createdAt(): NotificationData['createdAt'] {
    return this.data.createdAt;
  }

  public get canceledAt(): NotificationData['canceledAt'] {
    return this.data.canceledAt;
  }

  public read() {
    this.data.readAt = new Date();
  }

  public unread() {
    this.data.readAt = null;
  }

  public cancel(): void {
    this.data.canceledAt = new Date();
  }
}
