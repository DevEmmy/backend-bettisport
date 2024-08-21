import { Service } from 'typedi';
import Notification, { INotification } from '../models/notification';

@Service()
export class NotificationRepository {
  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return await Notification.create(data);
  }

  async findNotificationById(id: string): Promise<INotification | null> {
    return await Notification.findById(id).populate('user').exec();
  }

  async findNotificationsByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ user: userId }).populate('user').exec();
  }

  async markAsRead(id: string): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true }).exec();
  }

  async deleteNotification(id: string): Promise<INotification | null> {
    return await Notification.findByIdAndDelete(id).exec();
  }
}
