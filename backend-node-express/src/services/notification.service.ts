// TODO: Notification Service
// Purpose: Handle email, SMS, and in-app notifications
// Usage: Called by various services for notifications
// Responsibility: Queue and send notifications, track delivery status


import { prisma } from '../lib/prisma';
import { publishNotification, NotificationPayload } from '../lib/redisPubSub';
import logger from '../utils/logger.util';
import { sendStyledEmail } from '../utils/email';
import { buildEmailTemplate } from '../utils/emailTemplate';
import { NotificationType } from '../../generated/prisma/enums';

/**
 * Input parameters for creating a notification
 */
export interface CreateNotificationInput {
  userId: number;
  type: NotificationType; // NotificationType enum
  title: string;
  message: string;
  data?: any;
  sendEmail?: boolean; // Default: true
}

/**
 * Main function: Create notification, save to DB, and publish to Redis
 * This follows your existing patterns: service layer handles logic, returns data
 */
export const createAndPublishNotification = async (
  input: CreateNotificationInput
): Promise<any> => {
  try {
    const {
      userId,
      type,
      title,
      message,
      data = {},
      sendEmail: shouldSendEmail = true,
    } = input;

    logger.info(
      `[Notification Service] Creating notification for user ${userId}, type: ${type}`
    );

    // Step 1: Save notification to database
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data || {},
        isRead: false,
        readAt: null,
        emailSent: false,
        emailSentAt: null,
      },
    });

    logger.info(
      `[Notification Service] Saved notification ${notification.id} to database`
    );

    // Step 2: Publish to Redis for real-time delivery (SSE)
    const payload: NotificationPayload = {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      isRead: notification.isRead,
      createdAt: notification.createdAt.toISOString(),
    };

    await publishNotification(userId, payload);
    logger.info(`[Notification Service] Published notification to Redis`);

    // Step 3: Send email if requested
    if (shouldSendEmail) {
      try {
        // Get user details for email
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true, fullName: true },
        });

        if (user?.email) {
          // Determine email template based on notification type
          const emailTemplate = getEmailTemplate(type, notification, user.fullName);

          await sendStyledEmail(user.email, title, emailTemplate);

          // Update notification to mark email as sent
          await prisma.notification.update({
            where: { id: notification.id },
            data: {
              emailSent: true,
              emailSentAt: new Date(),
            },
          });

          logger.info(
            `[Notification Service] Email sent for notification ${notification.id}`
          );
        }
      } catch (emailError: any) {
        logger.error(
          `[Notification Service] Failed to send email for notification ${notification.id}:`,
          emailError
        );
        // Don't throw - email failure shouldn't block notification creation
      }
    }

    return notification;
  } catch (error: any) {
    logger.error(`[Notification Service] Failed to create notification:`, error);
    throw error;
  }
};

/**
 * Fetch paginated notifications for a user
 */
export const getUserNotifications = async (
  userId: number,
  page: number = 1,
  limit: number = 20
): Promise<{ notifications: any[]; total: number }> => {
  try {
    logger.info(
      `[Notification Service] Fetching notifications for user ${userId}, page: ${page}, limit: ${limit}`
    );

    // Validate pagination
    if (page < 1) page = 1;
    if (limit < 1) limit = 1;
    if (limit > 100) limit = 100; // Max 100 per page

    const skip = (page - 1) * limit;

    // Fetch notifications
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Newest first
      skip,
      take: limit,
    });

    // Get total count
    const total = await prisma.notification.count({
      where: { userId },
    });

    logger.info(
      `[Notification Service] Fetched ${notifications.length} notifications, total: ${total}`
    );

    return { notifications, total };
  } catch (error: any) {
    logger.error(
      `[Notification Service] Failed to fetch notifications for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Get count of unread notifications for a user
 */
export const getUnreadCount = async (userId: number): Promise<number> => {
  try {
    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    logger.info(
      `[Notification Service] Unread count for user ${userId}: ${count}`
    );
    return count;
  } catch (error: any) {
    logger.error(
      `[Notification Service] Failed to get unread count for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Mark a single notification as read
 */
export const markAsRead = async (
  notificationId: number,
  userId: number
): Promise<any> => {
  try {
    logger.info(
      `[Notification Service] Marking notification ${notificationId} as read for user ${userId}`
    );

    // Verify notification belongs to user (security check)
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new Error(`Notification ${notificationId} not found`);
    }

    if (notification.userId !== userId) {
      throw new Error(
        `Notification ${notificationId} does not belong to user ${userId}`
      );
    }

    // Update notification
    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    logger.info(`[Notification Service] Notification ${notificationId} marked as read`);
    return updated;
  } catch (error: any) {
    logger.error(
      `[Notification Service] Failed to mark notification as read:`,
      error
    );
    throw error;
  }
};

/**
 * Mark multiple notifications as read
 */
export const markBatchAsRead = async (
  notificationIds: number[],
  userId: number
): Promise<number> => {
  try {
    logger.info(
      `[Notification Service] Marking ${notificationIds.length} notifications as read for user ${userId}`
    );

    // Update all notifications for this user
    const result = await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        userId, // Security: only update user's own notifications
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    logger.info(
      `[Notification Service] Marked ${result.count} notifications as read`
    );
    return result.count;
  } catch (error: any) {
    logger.error(
      `[Notification Service] Failed to mark batch as read:`,
      error
    );
    throw error;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (
  notificationId: number,
  userId: number
): Promise<void> => {
  try {
    logger.info(
      `[Notification Service] Deleting notification ${notificationId} for user ${userId}`
    );

    // Verify notification belongs to user (security check)
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      logger.warn(
        `[Notification Service] Notification ${notificationId} not found, skipping delete`
      );
      return; // Don't throw - idempotent
    }

    if (notification.userId !== userId) {
      throw new Error(
        `Notification ${notificationId} does not belong to user ${userId}`
      );
    }

    // Delete notification
    await prisma.notification.delete({
      where: { id: notificationId },
    });

    logger.info(`[Notification Service] Notification ${notificationId} deleted`);
  } catch (error: any) {
    logger.error(
      `[Notification Service] Failed to delete notification:`,
      error
    );
    throw error;
  }
};

/**
 * Helper function: Get email template based on notification type
 * Matches your existing emailTemplate patterns
 */
function getEmailTemplate(
  type: string,
  notification: any,
  userName?: string | null
): string {
  switch (type) {
    case 'WELCOME':
      return buildEmailTemplate({
        title: 'Welcome to Dental Lab!',
        body: `
          <p style="font-size:16px;">Hello <strong>${userName || 'User'}</strong>,</p>
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <div style="background:#e7f3ff; border-left:4px solid #BDB0A7; padding:20px; margin:25px 0; border-radius:6px;">
            <p style="margin:0 0 12px 0; font-size:15px; color:#333;"><strong>Next Steps:</strong></p>
            <p style="margin:8px 0; font-size:14px; color:#555;">Your account is pending admin approval. You will receive another notification when activated.</p>
          </div>
        `,
        showButton: false,
      });

    case 'ACCOUNT_ACTIVATED':
      return buildEmailTemplate({
        title: 'Account Activated!',
        body: `
          <p style="font-size:16px;">Hello <strong>${userName || 'User'}</strong>,</p>
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            Your account is now active and ready to use. Log in to get started!
          </p>
        `,
        showButton: false,
      });

    case 'PASSWORD_RESET':
      return buildEmailTemplate({
        title: 'Password Reset Request',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            If you did not request this, please ignore this email.
          </p>
        `,
        showButton: false,
      });

    case 'UPLOAD_SUCCESS':
      return buildEmailTemplate({
        title: 'File Uploaded Successfully',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            Your file is now pending admin review.
          </p>
        `,
        showButton: false,
      });

    case 'UPLOAD_FAILED':
      return buildEmailTemplate({
        title: 'Upload Failed',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            Please try again or contact support if the issue persists.
          </p>
        `,
        showButton: false,
      });

    case 'FILE_APPROVED':
      return buildEmailTemplate({
        title: 'File Approved!',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            Your file has been reviewed and approved.
          </p>
        `,
        showButton: false,
      });

    case 'FILE_REJECTED':
      return buildEmailTemplate({
        title: 'File Rejected',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            Please upload a corrected file.
          </p>
        `,
        showButton: false,
      });

    case 'REJECTED':
      return buildEmailTemplate({
        title: 'Application Rejected',
        body: `
          <p style="font-size:15px; line-height:1.6; color:#555;">
            ${notification.message}
          </p>
          <p style="font-size:14px; color:#777;">
            If you have questions, please contact our support team.
          </p>
        `,
        showButton: false,
      });

    default:
      return buildEmailTemplate({
        title: notification.title,
        body: `<p style="font-size:15px; line-height:1.6; color:#555;">${notification.message}</p>`,
        showButton: false,
      });
  }
}

export default {
  createAndPublishNotification,
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markBatchAsRead,
  deleteNotification,
};
