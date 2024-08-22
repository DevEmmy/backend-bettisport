/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60c72b2f9b1d4c001cfaf113"
 *         user:
 *           type: string
 *           example: "60c72b2f9b1d4c001cfaf112"
 *         title:
 *           type: string
 *           example: "New Like"
 *         message:
 *           type: string
 *           example: "Your post has been liked by another user."
 *         read:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: "60c72b2f9b1d4c001cfaf112"
 *               title:
 *                 type: string
 *                 example: "New Like"
 *               message:
 *                 type: string
 *                 example: "Your post has been liked by another user."
 *               read:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '201':
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *   get:
 *     summary: Get all notifications for the authenticated user
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /notifications/{id}:
 *   get:
 *     summary: Get notification by ID
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Notification found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete notification by ID
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Notification deleted successfully
 *       '404':
 *         description: Notification not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /notifications/read/{id}:
 *   patch:
 *     summary: Mark notification as read
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
