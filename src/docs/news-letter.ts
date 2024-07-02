/**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Newsletter entry
 *         email:
 *           type: string
 *           description: The email address of the subscriber
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the email was subscribed
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         email: example@example.com
 *         createdAt: 2024-06-15T14:20:00Z
 *
 * tags:
 *   - name: Newsletter
 *     description: This manages all newsletter subscription endpoints
 * 
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to subscribe
 *             example:
 *               email: example@example.com
 *     responses:
 *       200:
 *         description: Successfully subscribed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       400:
 *         description: Invalid input or email already subscribed
 *       500:
 *         description: Some server error
 * 
 * /newsletter/subscribers:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Newsletter]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Newsletter'
 *       500:
 *         description: Some server error
 * 
 * /newsletter/unsubscribe:
 *   post:
 *     summary: Unsubscribe from the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address to unsubscribe
 *             example:
 *               email: example@example.com
 *     responses:
 *       200:
 *         description: Successfully unsubscribed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       400:
 *         description: Invalid input or email not found
 *       500:
 *         description: Some server error
 */
