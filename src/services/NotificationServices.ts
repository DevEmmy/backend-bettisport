import { Service } from 'typedi';
import { NotificationRepository } from '../repositories/NotificationRepository';
import { INotification } from '../models/notification';
import mongoose from 'mongoose';


@Service()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return await this.notificationRepository.createNotification(data);
  }

  async getNotificationById(id: string): Promise<INotification | null> {
    return await this.notificationRepository.findNotificationById(id);
  }

  async getUserNotifications(userId: string): Promise<INotification[]> {
    return await this.notificationRepository.findNotificationsByUser(userId);
  }

  async markNotificationAsRead(id: string): Promise<INotification | null> {
    return await this.notificationRepository.markAsRead(id);
  }

  async deleteNotification(id: string): Promise<INotification | null> {
    return await this.notificationRepository.deleteNotification(id);
  }

  // New methods for post liked and saved notifications
  async notifyPostLiked(postOwnerId: any, user: string): Promise<INotification> {
    const notificationData: Partial<INotification> = {
      user: postOwnerId,
      title: 'Your post was liked!',
      message: `${user} liked your post.`,
      read: false,
    };
    return await this.createNotification(notificationData);
  }

  async notifyPostSaved(postOwnerId: any, user: string): Promise<INotification> {
    const notificationData: Partial<INotification> = {
        user: postOwnerId,
      title: 'Your post was saved!',
      message: `${user} saved your post.`,
      read: false,
    };
    return await this.createNotification(notificationData);
  }
}
