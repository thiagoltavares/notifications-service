import { randomUUID } from 'node:crypto';
import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  createdAt: Date;
  readAt?: Date | null;
  canceledAt?: Date | null;
}

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: MakeOptional<NotificationProps, 'createdAt'>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId() {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content() {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category() {
    return this.props.category;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt() {
    return this.props.readAt;
  }

  public get canceledAt() {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
