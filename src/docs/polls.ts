/**
 * @swagger
 * components:
 *   schemas:
 *     Choice:
 *       type: object
 *       required:
 *         - choiceText
 *       properties:
 *         choiceText:
 *           type: string
 *           description: Text of the choice
 *         votes:
 *           type: number
 *           description: Number of votes for the choice
 *           default: 0
 *         voters:
 *           type: array
 *           items:
 *             type: string
 *             description: User ID of the voter
 *     Poll:
 *       type: object
 *       required:
 *         - question
 *         - format
 *         - duration
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Poll
 *         question:
 *           type: string
 *           description: The question of the poll
 *         format:
 *           type: string
 *           description: The format of the poll
 *         choices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Choice'
 *           description: List of choices in the poll
 *         duration:
 *           type: number
 *           description: Duration of the poll in minutes
 *         author:
 *           type: string
 *           description: The user ID of the author
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the poll was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the poll was last updated
 * 
 * tags:
 *   - name: Polls
 *     description: API for managing polls
 * 
 * /polls:
 *   post:
 *     summary: Create a new poll
 *     tags: [Polls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all polls
 *     tags: [Polls]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 * /polls/{id}:
 *   get:
 *     summary: Get a poll by ID
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The poll ID
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update a poll by ID
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The poll ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a poll by ID
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The poll ID
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Some server error
 * 
 * /polls/vote:
 *   post:
 *     summary: Vote on a poll
 *     tags: [Polls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pollId
 *               - choiceId
 *               - userId
 *             properties:
 *               pollId:
 *                 type: string
 *                 description: The poll ID
 *               choiceId:
 *                 type: string
 *                 description: The choice ID
 *               userId:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: Successfully voted
 *       500:
 *         description: Some server error
 * 
 * /polls/author/{authorId}:
 *   get:
 *     summary: Get polls by author
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 * 
 * /polls/question/{query}:
 *   get:
 *     summary: Find polls by question
 *     tags: [Polls]
 *     parameters:
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query for the question
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 */
