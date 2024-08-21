import { Request, Response } from 'express';
import { Service } from 'typedi';
import { NotificationService } from '../services/NotificationServices';


@Service()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  async createNotification(req: Request, res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.createNotification(req.body);
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create notification', error });
    }
  }

  async getNotificationById(req: Request, res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.getNotificationById(req.params.id);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve notification', error });
    }
  }

  async getUserNotifications(req: Request, res: Response): Promise<Response> {
    try {
      let userId = req.body.user
      const notifications = await this.notificationService.getUserNotifications(userId);
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to retrieve notifications', error });
    }
  }

  async markNotificationAsRead(req: Request, res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.markNotificationAsRead(req.params.id);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to mark notification as read', error });
    }
  }

  async deleteNotification(req: Request, res: Response): Promise<Response> {
    try {
      const notification = await this.notificationService.deleteNotification(req.params.id);
      if (!notification) return res.status(404).json({ message: 'Notification not found' });
      return res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete notification', error });
    }
  }
}
