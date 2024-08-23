import { Router } from 'express';
import { Container } from 'typedi';
import { NotificationController } from '../controllers/NotificationController';
import { verifyAuth } from '../middleware/verifyAuth';


const router = Router();
const notificationController = Container.get(NotificationController);

router.post('/', verifyAuth, (req, res) => notificationController.createNotification(req, res));
router.get('/:id', verifyAuth, (req, res) => notificationController.getNotificationById(req, res));
router.get('/', verifyAuth, (req, res) => notificationController.getUserNotifications(req, res));
router.patch('/read/:id', verifyAuth, (req, res) => notificationController.markNotificationAsRead(req, res));
router.delete('/:id', verifyAuth, (req, res) => notificationController.deleteNotification(req, res));

export default router;
