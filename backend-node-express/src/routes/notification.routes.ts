import { Router, Request, Response } from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { throttleByIP } from '../middlewares/rate-limit.middleware';
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markBatchAsRead,
  deleteNotification,
} from '../services/notification.service';
import { subscribeToAdminNotifications, subscribeToNotifications } from '../lib/redisPubSub';
import logger from '../utils/logger.util';
import { successResponse, errorResponse } from '../utils/response.util';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 42
 *         type:
 *           type: string
 *           enum: [WELCOME, ACCOUNT_ACTIVATED, PASSWORD_RESET, UPLOAD_SUCCESS, UPLOAD_FAILED, APPROVAL_PENDING, APPROVED, REJECTED, FILE_APPROVED, FILE_REJECTED, ORDER_CREATED, ORDER_UPDATED, ORDER_CANCELLED, INFO, WARNING, ERROR]
 *           example: WELCOME
 *         title:
 *           type: string
 *           example: "Welcome to Dental Lab!"
 *         message:
 *           type: string
 *           example: "Your account has been created successfully"
 *         data:
 *           type: object
 *           example: { "fileId": 123, "reason": "Invalid format" }
 *         isRead:
 *           type: boolean
 *           example: false
 *         readAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 *         emailSent:
 *           type: boolean
 *           example: true
 *         emailSentAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-01-18T00:00:00Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-18T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-18T00:00:00Z"
 *
 *     NotificationResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Notification'
 *             - type: object
 *         message:
 *           type: string
 *           example: "Notification fetched successfully"
 *
 *   parameters:
 *     NotificationId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *       description: Notification ID
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Missing or invalid authentication token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "error"
 *               message:
 *                 type: string
 *                 example: "Unauthorized"
 *               statusCode:
 *                 type: integer
 *                 example: 401
 *     ForbiddenError:
 *       description: User does not have permission to access this resource
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "error"
 *               message:
 *                 type: string
 *                 example: "Forbidden"
 *               statusCode:
 *                 type: integer
 *                 example: 403
 *     NotFoundError:
 *       description: Notification not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "error"
 *               message:
 *                 type: string
 *                 example: "Notification not found"
 *               statusCode:
 *                 type: integer
 *                 example: 404
 */

/**
 * @swagger
 * /api/notifications/stream:
 *   get:
 *     summary: Real-time notification stream (SSE)
 *     description: |
 *       Establishes a Server-Sent Events (SSE) connection for real-time notifications.
 *       The client will receive notifications as they are created.
 *       
 *       **How it works:**
 *       1. Client connects with valid JWT token
 *       2. Server establishes SSE connection
 *       3. Notifications are streamed in real-time as they occur
 *       4. Connection stays open until client disconnects
 *       
 *       **Example JavaScript client:**
 *       ```
 *       const eventSource = new EventSource('/api/notifications/stream', {
 *         headers: { 'Authorization': 'Bearer YOUR_JWT_TOKEN' }
 *       });
 *       
 *       eventSource.addEventListener('notification', (event) => {
 *         const notification = JSON.parse(event.data);
 *         console.log('New notification:', notification);
 *       });
 *       ```
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: SSE stream established successfully
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: |
 *                 :connected to notifications stream
 *
 *                 event: notification
 *                 data: {"id":1,"type":"WELCOME","title":"Welcome!","message":"Welcome to Dental Lab","data":{},"isRead":false,"createdAt":"2025-01-18T00:00:00Z"}
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Too many requests from your IP address"
 *                 statusCode:
 *                   type: integer
 *                   example: 429
 */
router.get(
  '/stream',
  verifyAccessToken,
  throttleByIP,
  (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        logger.warn('[Notification SSE] No userId found in request');
        return res.status(401).json(errorResponse('Unauthorized', 401));
      }

      logger.info(`[Notification SSE] User ${userId} connecting to SSE stream`);

      // Set SSE response headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.setHeader("Access-Control-Allow-Credentials", "true"); //Allow cred
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');//Allow local origin 
      res.flushHeaders?.();

      res.write(`event: connected\ndata: Connected to notifications stream\n\n`);

      const unsubscribe = subscribeToNotifications(userId, (notification) => {
        res.write(`event: notification\n`);
        res.write(`data: ${JSON.stringify(notification)}\n\n`);
        logger.info(
          `[Notification SSE] Sent notification ${notification.id} to user ${userId}`
        );
      });

      req.on('close', () => {
        logger.info(`[Notification SSE] User ${userId} disconnected from SSE stream`);
        unsubscribe();
        res.end();
      });

      req.on('error', (error: any) => {
        logger.error(`[Notification SSE] Error in SSE connection for user ${userId}:`, error);
        unsubscribe();
        res.end();
      });

      res.on('error', (error: any) => {
        logger.error(`[Notification SSE] Response error for user ${userId}:`, error);
        unsubscribe();
        res.end();
      });
    } catch (error: any) {
      logger.error('[Notification SSE] Unexpected error in SSE endpoint:', error);
      res.status(500).json(errorResponse('Failed to establish SSE connection', 500));
    }
  }
);


/**
 * @swagger
 * /api/notifications/admin/stream:
 *   get:
 *     summary: Admin real-time notification stream (SSE)
 *     description: |
 *       Establishes a Server-Sent Events (SSE) connection for admin-only notifications.
 *       Admins will receive real-time alerts for:
 *       - New account approvals pending
 *       - New order approvals pending
 *       
 *       **Only accessible by ADMIN and OWNER roles**
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: SSE stream established successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Only admins can access this endpoint
 *       429:
 *         description: Too many requests
 */
router.get(
  '/admin/stream',
  verifyAccessToken,
  throttleByIP,
  (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id;
      const userRole = (req as any).user?.role;

      // Check authorization
      if (userRole !== 'ADMIN' && userRole !== 'OWNER') {
        logger.warn(`[Notification Admin SSE] Unauthorized access attempt by user ${userId}`);
        return res.status(403).json(errorResponse('Only admins can access this endpoint', 403));
      }

      if (!userId) {
        logger.warn('[Notification Admin SSE] No userId found in request');
        return res.status(401).json(errorResponse('Unauthorized', 401));
      }

      logger.info(`[Notification Admin SSE] Admin ${userId} connecting to admin notification stream`);

      // Set SSE response headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.flushHeaders?.();

      res.write(`event: connected\ndata: Connected to admin notifications stream\n\n`);

      // Subscribe to admin broadcast channel

      const unsubscribe = subscribeToAdminNotifications((notification) => {
        res.write(`event: admin_notification\n`);
        res.write(`data: ${JSON.stringify(notification)}\n\n`);
        logger.info(
          `[Notification Admin SSE] Sent admin notification to user ${userId}`
        );
      });

      req.on('close', () => {
        logger.info(`[Notification Admin SSE] Admin ${userId} disconnected`);
        unsubscribe();
        res.end();
      });

      req.on('error', (error: any) => {
        logger.error(`[Notification Admin SSE] Error for admin ${userId}:`, error);
        unsubscribe();
        res.end();
      });

      res.on('error', (error: any) => {
        logger.error(`[Notification Admin SSE] Response error for admin ${userId}:`, error);
        unsubscribe();
        res.end();
      });
    } catch (error: any) {
      logger.error('[Notification Admin SSE] Unexpected error:', error);
      res.status(500).json(errorResponse('Failed to establish admin notification stream', 500));
    }
  }
);


/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get paginated notifications for current user
 *     description: Fetch all notifications for the authenticated user with pagination
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page (max 100)
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     notifications:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Notification'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         total:
 *                           type: integer
 *                           example: 45
 *                         pages:
 *                           type: integer
 *                           example: 3
 *                 message:
 *                   type: string
 *                   example: "Notifications fetched successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Internal server error
 */
router.get('/', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');

    logger.info(
      `[Notification] Fetching notifications for user ${userId}, page: ${page}, limit: ${limit}`
    );

    const { notifications, total } = await getUserNotifications(userId, page, limit);

    return res.status(200).json(
      successResponse(
        {
          notifications,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
        'Notifications fetched successfully'
      )
    );
  } catch (error: any) {
    logger.error('[Notification] Error fetching notifications:', error);
    return res.status(500).json(errorResponse('Failed to fetch notifications', 500, error.message));
  }
});

/**
 * @swagger
 * /api/notifications/unread/count:
 *   get:
 *     summary: Get count of unread notifications
 *     description: Returns the number of unread notifications for the current user
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     unreadCount:
 *                       type: integer
 *                       example: 5
 *                 message:
 *                   type: string
 *                   example: "Unread count retrieved successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/unread/count', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    logger.info(`[Notification] Getting unread count for user ${userId}`);

    const unreadCount = await getUnreadCount(userId);

    return res.status(200).json(
      successResponse(
        { unreadCount },
        'Unread count retrieved successfully'
      )
    );
  } catch (error: any) {
    logger.error('[Notification] Error getting unread count:', error);
    return res.status(500).json(errorResponse('Failed to get unread count', 500, error.message));
  }
});

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     description: Mark a single notification as read and update the readAt timestamp
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/NotificationId'
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read successfully"
 *       400:
 *         description: Invalid notification ID
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id/read', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const notificationId = parseInt(req.params.id);

    if (!notificationId || isNaN(notificationId)) {
      return res.status(400).json(errorResponse('Invalid notification ID', 400));
    }

    logger.info(
      `[Notification] Marking notification ${notificationId} as read for user ${userId}`
    );

    const updated = await markAsRead(notificationId, userId);

    return res.status(200).json(
      successResponse(updated, 'Notification marked as read successfully')
    );
  } catch (error: any) {
    logger.error('[Notification] Error marking as read:', error);

    if (error.message.includes('does not belong')) {
      return res.status(403).json(
        errorResponse('You do not have permission to update this notification', 403)
      );
    }

    if (error.message.includes('not found')) {
      return res.status(404).json(errorResponse('Notification not found', 404));
    }

    return res.status(500).json(errorResponse('Failed to mark notification as read', 500, error.message));
  }
});

/**
 * @swagger
 * /api/notifications/read-batch:
 *   post:
 *     summary: Mark multiple notifications as read
 *     description: Mark multiple notifications as read in a single request
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [1, 2, 3, 4, 5]
 *                 description: Array of notification IDs to mark as read
 *     responses:
 *       200:
 *         description: Notifications marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 5
 *                 message:
 *                   type: string
 *                   example: "5 notification(s) marked as read successfully"
 *       400:
 *         description: Invalid request body
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/read-batch', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json(
        errorResponse('Invalid or empty ids array', 400)
      );
    }

    logger.info(
      `[Notification] Marking ${ids.length} notifications as read for user ${userId}`
    );

    const count = await markBatchAsRead(ids, userId);

    return res.status(200).json(
      successResponse(
        { count },
        `${count} notification(s) marked as read successfully`
      )
    );
  } catch (error: any) {
    logger.error('[Notification] Error in batch read:', error);
    return res.status(500).json(errorResponse('Failed to mark notifications as read', 500, error.message));
  }
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete notification
 *     description: Delete a notification. Only the owner can delete their notifications.
 *     tags:
 *       - Notifications
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/NotificationId'
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: "Notification deleted successfully"
 *       400:
 *         description: Invalid notification ID
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete('/:id', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const notificationId = parseInt(req.params.id);

    if (!notificationId || isNaN(notificationId)) {
      return res.status(400).json(errorResponse('Invalid notification ID', 400));
    }

    logger.info(
      `[Notification] Deleting notification ${notificationId} for user ${userId}`
    );

    await deleteNotification(notificationId, userId);

    return res.status(200).json(successResponse(null, 'Notification deleted successfully'));
  } catch (error: any) {
    logger.error('[Notification] Error deleting notification:', error);

    if (error.message.includes('does not belong')) {
      return res.status(403).json(
        errorResponse('You do not have permission to delete this notification', 403)
      );
    }

    return res.status(500).json(errorResponse('Failed to delete notification', 500, error.message));
  }
});

export default router;
