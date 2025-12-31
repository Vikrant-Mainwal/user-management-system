/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative API operations
 */

/**
 * @swagger
 * /api/v1/admin:
 *   post:
 *     summary: Register a new admin account
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 */

/**
 * @swagger
 * /api/v1/admin/auth:
 *   post:
 *     summary: Authenticate admin credentials
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: admin@example.com
 *               password: adminPass123
 */

/**
 * @swagger
 * /api/v1/admin/logout:
 *   post:
 *     summary: Logout admin user
 *     tags: [Admin]
 */

/**
 * @swagger
 * /api/v1/admin/profile:
 *   get:
 *     summary: Retrieve admin profile information
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *   put:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Fetch all users
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 */

/**
 * @swagger
 * /api/v1/admin/users/block:
 *   patch:
 *     summary: Block a specific user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             example:
 *               userId: "64f123abc456"
 */

/**
 * @swagger
 * /api/v1/admin/users/unblock:
 *   patch:
 *     summary: Unblock a previously blocked user
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             example:
 *               userId: "64f123abc456"
 */

/**
 * @swagger
 * /api/v1/admin/users/update:
 *   put:
 *     summary: Update user information
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               userId: "64f123abc456"
 *               name: Updated User
 *               email: updated@example.com
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: End-user authentication & profile APIs
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/v1/user/auth:
 *   post:
 *     summary: Authenticate a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Logout authenticated user
 *     tags: [User]
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile details
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 */
