// TODO: Notification Testing Routes
// Purpose: Simple endpoints to manually test notification functionality from Postman
// Usage: Use only in development environment
// Responsibility: Trigger various notification scenarios for testing

import { Router, Request, Response } from 'express';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import { createAndPublishNotification } from '../services/notification.service';
import logger from '../utils/logger.util';
import { successResponse, errorResponse } from '../utils/response.util';
import { NotificationType } from '@prisma/client';

const router = Router();

// ==================== TEST ENDPOINTS ====================

/**
 * @swagger
 * /api/notifications-test/send-welcome:
 *   post:
 *     summary: "[TEST] Send WELCOME notification"
 *     description: Manually trigger a WELCOME notification for testing
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome notification sent successfully
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
 *                 message:
 *                   type: string
 *                   example: "Welcome notification sent successfully"
 *       401:
 *         description: Unauthorized
 */
router.post('/send-welcome', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    logger.info(`[Notification Test] Sending WELCOME notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.WELCOME,
      title: 'Welcome to Dental Lab!',
      message: 'Welcome to the Dental Lab Management System. Your account is pending admin approval.',
      data: {
        testMode: true,
        timestamp: new Date().toISOString(),
      },
      sendEmail: false,
    });

    logger.info(`[Notification Test] WELCOME notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'Welcome notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending WELCOME notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send welcome notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-account-activated:
 *   post:
 *     summary: "[TEST] Send ACCOUNT_ACTIVATED notification"
 *     description: Manually trigger an account activation notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Account activated notification sent successfully
 */
router.post('/send-account-activated', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    logger.info(`[Notification Test] Sending ACCOUNT_ACTIVATED notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.ACCOUNT_ACTIVATED,
      title: 'Account Activated!',
      message: 'Your account has been approved by the admin and is now active.',
      data: {
        testMode: true,
        approvedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(`[Notification Test] ACCOUNT_ACTIVATED notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'Account activated notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending ACCOUNT_ACTIVATED notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send account activated notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-upload-success:
 *   post:
 *     summary: "[TEST] Send UPLOAD_SUCCESS notification"
 *     description: Manually trigger a file upload success notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "document.pdf"
 *               fileSize:
 *                 type: number
 *                 example: 2048000
 *     responses:
 *       200:
 *         description: Upload success notification sent successfully
 */
router.post('/send-upload-success', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { fileName = 'document.pdf', fileSize = 2048000 } = req.body;

    logger.info(
      `[Notification Test] Sending UPLOAD_SUCCESS notification to user ${userId}`
    );

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.UPLOAD_SUCCESS,
      title: 'File Uploaded Successfully',
      message: `Your file "${fileName}" (${Math.round(fileSize / 1024)} KB) has been uploaded successfully and is pending admin review.`,
      data: {
        testMode: true,
        fileName,
        fileSize,
        uploadedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(
      `[Notification Test] UPLOAD_SUCCESS notification sent: ${notification.id}`
    );

    return res.status(200).json(
      successResponse(notification, 'Upload success notification sent successfully')
    );
  } catch (error: any) {
    logger.error(
      '[Notification Test] Error sending UPLOAD_SUCCESS notification:',
      error
    );
    return res.status(500).json(
      errorResponse('Failed to send upload success notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-upload-failed:
 *   post:
 *     summary: "[TEST] Send UPLOAD_FAILED notification"
 *     description: Manually trigger a file upload failure notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "File format not supported"
 *     responses:
 *       200:
 *         description: Upload failed notification sent successfully
 */
router.post('/send-upload-failed', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { error = 'File format not supported' } = req.body;

    logger.info(`[Notification Test] Sending UPLOAD_FAILED notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.UPLOAD_FAILED,
      title: 'File Upload Failed',
      message: `Your file upload failed. Reason: ${error}. Please try again or contact support.`,
      data: {
        testMode: true,
        error,
        failedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(`[Notification Test] UPLOAD_FAILED notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'Upload failed notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending UPLOAD_FAILED notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send upload failed notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-file-approved:
 *   post:
 *     summary: "[TEST] Send FILE_APPROVED notification"
 *     description: Manually trigger a file approval notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "document.pdf"
 *     responses:
 *       200:
 *         description: File approved notification sent successfully
 */
router.post('/send-file-approved', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { fileName = 'document.pdf' } = req.body;

    logger.info(`[Notification Test] Sending FILE_APPROVED notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.FILE_APPROVED,
      title: 'File Approved!',
      message: `Your file "${fileName}" has been reviewed and approved by admin. You can now proceed with your order.`,
      data: {
        testMode: true,
        fileName,
        approvedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(`[Notification Test] FILE_APPROVED notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'File approved notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending FILE_APPROVED notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send file approved notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-file-rejected:
 *   post:
 *     summary: "[TEST] Send FILE_REJECTED notification"
 *     description: Manually trigger a file rejection notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "document.pdf"
 *               reason:
 *                 type: string
 *                 example: "Invalid file format"
 *     responses:
 *       200:
 *         description: File rejected notification sent successfully
 */
router.post('/send-file-rejected', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const {
      fileName = 'document.pdf',
      reason = 'Invalid file format. Please use PDF or JPEG.',
    } = req.body;

    logger.info(`[Notification Test] Sending FILE_REJECTED notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.FILE_REJECTED,
      title: 'File Rejected',
      message: `Your file "${fileName}" was rejected. Reason: ${reason}. Please upload a corrected file.`,
      data: {
        testMode: true,
        fileName,
        reason,
        rejectedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(`[Notification Test] FILE_REJECTED notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'File rejected notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending FILE_REJECTED notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send file rejected notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-rejected:
 *   post:
 *     summary: "[TEST] Send REJECTED notification"
 *     description: Manually trigger a user rejection notification
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Application incomplete"
 *     responses:
 *       200:
 *         description: Rejection notification sent successfully
 */
router.post('/send-rejected', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { reason = 'Your application did not meet our requirements.' } = req.body;

    logger.info(`[Notification Test] Sending REJECTED notification to user ${userId}`);

    const notification = await createAndPublishNotification({
      userId,
      type: NotificationType.REJECTED,
      title: 'Application Rejected',
      message: `Your application has been rejected. Reason: ${reason}. If you have questions, please contact our support team.`,
      data: {
        testMode: true,
        reason,
        rejectedAt: new Date().toISOString(),
      },
      sendEmail: true,
    });

    logger.info(`[Notification Test] REJECTED notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'Rejection notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending REJECTED notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send rejection notification', 500, error.message)
    );
  }
});

/**
 * @swagger
 * /api/notifications-test/send-custom:
 *   post:
 *     summary: "[TEST] Send custom notification"
 *     description: Send a custom notification with any type and message
 *     tags:
 *       - Notifications (Test)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - title
 *               - message
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [WELCOME, ACCOUNT_ACTIVATED, PASSWORD_RESET, UPLOAD_SUCCESS, UPLOAD_FAILED, APPROVAL_PENDING, APPROVED, REJECTED, FILE_APPROVED, FILE_REJECTED, ORDER_CREATED, ORDER_UPDATED, ORDER_CANCELLED, INFO, WARNING, ERROR]
 *                 example: "INFO"
 *               title:
 *                 type: string
 *                 example: "Custom Notification"
 *               message:
 *                 type: string
 *                 example: "This is a custom test notification"
 *               data:
 *                 type: object
 *                 example: { "customKey": "customValue" }
 *               sendEmail:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Custom notification sent successfully
 */
router.post('/send-custom', verifyAccessToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { type, title, message, data = {}, sendEmail = false } = req.body;

    // Validate required fields
    if (!type || !title || !message) {
      return res.status(400).json(
        errorResponse('Missing required fields: type, title, message', 400)
      );
    }

    // Validate notification type
    const validTypes = [
      'WELCOME',
      'ACCOUNT_ACTIVATED',
      'PASSWORD_RESET',
      'UPLOAD_SUCCESS',
      'UPLOAD_FAILED',
      'APPROVAL_PENDING',
      'APPROVED',
      'REJECTED',
      'FILE_APPROVED',
      'FILE_REJECTED',
      'ORDER_CREATED',
      'ORDER_UPDATED',
      'ORDER_CANCELLED',
      'INFO',
      'WARNING',
      'ERROR',
    ];

    if (!validTypes.includes(type)) {
      return res.status(400).json(
        errorResponse(`Invalid notification type. Must be one of: ${validTypes.join(', ')}`, 400)
      );
    }

    logger.info(
      `[Notification Test] Sending custom notification (${type}) to user ${userId}`
    );

    const notification = await createAndPublishNotification({
      userId,
      type: type as NotificationType,
      title,
      message,
      data: {
        ...data,
        testMode: true,
        customNotification: true,
      },
      sendEmail,
    });

    logger.info(`[Notification Test] Custom notification sent: ${notification.id}`);

    return res.status(200).json(
      successResponse(notification, 'Custom notification sent successfully')
    );
  } catch (error: any) {
    logger.error('[Notification Test] Error sending custom notification:', error);
    return res.status(500).json(
      errorResponse('Failed to send custom notification', 500, error.message)
    );
  }
});

export default router;
