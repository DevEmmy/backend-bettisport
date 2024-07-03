"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Post
 *         title:
 *           type: string
 *           description: Post title
 *         author:
 *           type: string
 *           description: The user ID of the author
 *         content:
 *           type: string
 *           description: Content of the post
 *         media:
 *           type: string
 *           description: Media associated with the post
 *         publish:
 *           type: boolean
 *           description: Publish status
 *           default: false
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of category IDs
 *         menCategories:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of men's category IDs
 *         womenCategories:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of women's category IDs
 *         excerpt:
 *           type: string
 *           description: Excerpt of the post
 *         format:
 *           type: string
 *           description: Format of the post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *         featuredImage:
 *           type: string
 *           description: Featured image URL
 *         nationality:
 *           type: string
 *           description: Nationality of the post's context
 *         highlight:
 *           type: string
 *           description: Highlight of the post
 *         photoSplash:
 *           type: string
 *           description: Photo splash URL
 *         slug:
 *           type: string
 *           description: Slug for the post
 *         fantasy:
 *           type: boolean
 *           description: Fantasy status
 *           default: false
 *         editorsPick:
 *           type: boolean
 *           description: Editor's pick status
 *           default: false
 *         newsBreaking:
 *           type: boolean
 *           description: News breaking status
 *           default: false
 *         comments:
 *           type: string
 *           description: Comment ID
 *         reads:
 *           type: number
 *           description: Number of reads
 *           default: 0
 *         featured:
 *           type: boolean
 *           description: Featured status
 *           default: false
 *
 * tags:
 *   - name: Posts
 *     description: This manages all post endpoints
 *
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       500:
 *         description: Some server error
 *
 * /posts/class/editors:
 *   get:
 *     summary: Get posts by editor's pick
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/trending:
 *   get:
 *     summary: Get trending posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/popular:
 *   get:
 *     summary: Get popular posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/news-breaking:
 *   get:
 *     summary: Get news-breaking posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/featured:
 *   get:
 *     summary: Get featured posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/articles:
 *   get:
 *     summary: Get articles posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/photo-splash:
 *   get:
 *     summary: Get photo-splash posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/in-focus:
 *   get:
 *     summary: Get in-focus posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/class/fantasy:
 *   get:
 *     summary: Get fantasy posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 *
 * /posts/author/{authorId}:
 *   get:
 *     summary: Get posts by author
 *     tags: [Posts]
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
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
