/**
 * @swagger
 * components:
 *   schemas:
 *     Feed:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Feed
 *         content:
 *           type: string
 *           description: Content of the feed
 *         postedBy:
 *           type: string
 *           description: The user ID who posted the feed
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the feed
 *         image:
 *           type: string
 *           description: URL of the image associated with the feed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feed was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feed was last updated
 *
 * tags:
 *   - name: Feeds
 *     description: API for managing feeds
 *
 * /feeds:
 *   post:
 *     summary: Create a new feed
 *     tags: [Feeds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feed'
 *     responses:
 *       200:
 *         description: Feed successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feed'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all feeds
 *     tags: [Feeds]
 *     responses:
 *       200:
 *         description: Successfully retrieved all feeds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feed'
 *       500:
 *         description: Some server error
 *
 * /feeds/{id}:
 *   get:
 *     summary: Get a feed by ID
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the feed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feed'
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update a feed by ID
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feed'
 *     responses:
 *       200:
 *         description: Successfully updated the feed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feed'
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a feed by ID
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed ID
 *     responses:
 *       200:
 *         description: Successfully deleted the feed
 *       404:
 *         description: Feed not found
 *       500:
 *         description: Some server error
 */
