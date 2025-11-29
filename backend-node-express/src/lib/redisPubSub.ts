import Redis from 'ioredis';
import logger from '../utils/logger.util';

/**
 * Redis PubSub Manager for notifications
 * Handles publishing and subscribing to notification channels
 */

// Create Redis instances
// One for publishing, one for subscribing (Redis requires separate connections for PubSub)
const publisherClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
});

const subscriberClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
});

// Error handling
publisherClient.on('error', (err) => {
  logger.error(`[Redis Publisher Error]: ${err.message}`);
});

subscriberClient.on('error', (err) => {
  logger.error(`[Redis Subscriber Error]: ${err.message}`);
});

publisherClient.on('connect', () => {
  logger.info('[Redis Publisher] Connected');
});

subscriberClient.on('connect', () => {
  logger.info('[Redis Subscriber] Connected');
});

/**
 * Notification data structure matching Prisma model
 */
export interface NotificationPayload {
  id: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

/**
 * Publish a notification event to a user's channel
 * @param userId - The user ID to notify
 * @param notificationData - The notification object to send
 */
export async function publishNotification(
  userId: number,
  notificationData: NotificationPayload
): Promise<void> {
  try {
    const channel = `notifications:${userId}`;
    const message = JSON.stringify(notificationData);
    
    const result = await publisherClient.publish(channel, message);
    logger.info(`[PubSub] Published notification to channel ${channel}, subscribers: ${result}`);
  } catch (error: any) {
    logger.error(`[PubSub] Failed to publish notification:`, error);
    throw error;
  }
}

/**
 * Subscribe to a user's notification channel
 * @param userId - The user ID to listen for
 * @param onMessage - Callback function when message received
 * @returns Unsubscribe function
 */
export function subscribeToNotifications(
  userId: number,
  onMessage: (message: NotificationPayload) => void
): () => Promise<void> {
  const channel = `notifications:${userId}`;
  
  const messageHandler = (_receivedChannel: string, message: string) => {
    if (_receivedChannel === channel) {
      try {
        const notificationData = JSON.parse(message) as NotificationPayload;
        onMessage(notificationData);
      } catch (error: any) {
        logger.error(`[PubSub] Failed to parse notification message:`, error);
      }
    }
  };

  subscriberClient.on('message', messageHandler);
  subscriberClient.subscribe(channel, (err) => {
    if (err) {
      logger.error(`[PubSub] Failed to subscribe to ${channel}:`, err);
    } else {
      logger.info(`[PubSub] Subscribed to channel ${channel}`);
    }
  });

  // Return unsubscribe function
  return async () => {
    await subscriberClient.unsubscribe(channel);
    subscriberClient.removeListener('message', messageHandler);
    logger.info(`[PubSub] Unsubscribed from channel ${channel}`);
  };
}

/**
 * Publish a notification to all admins
 * Uses a broadcast channel that all admins subscribe to
 */
export async function publishAdminNotification(
  notificationData: NotificationPayload & { triggeredBy?: number }
): Promise<void> {
  try {
    const channel = `notifications:admin:broadcast`;
    const message = JSON.stringify(notificationData);
    
    const result = await publisherClient.publish(channel, message);
    logger.info(`[PubSub] Published admin notification to channel ${channel}, subscribers: ${result}`);
  } catch (error: any) {
    logger.error(`[PubSub] Failed to publish admin notification:`, error);
    throw error;
  }
}

/**
 * Subscribe an admin to the broadcast admin notification channel
 * @param onMessage - Callback when admin notification received
 * @returns Unsubscribe function
 */
export function subscribeToAdminNotifications(
  onMessage: (message: NotificationPayload) => void
): () => Promise<void> {
  const channel = `notifications:admin:broadcast`;
  
  const messageHandler = (_receivedChannel: string, message: string) => {
    if (_receivedChannel === channel) {
      try {
        const notificationData = JSON.parse(message) as NotificationPayload;
        onMessage(notificationData);
      } catch (error: any) {
        logger.error(`[PubSub] Failed to parse admin notification message:`, error);
      }
    }
  };

  subscriberClient.on('message', messageHandler);
  subscriberClient.subscribe(channel, (err) => {
    if (err) {
      logger.error(`[PubSub] Failed to subscribe to ${channel}:`, err);
    } else {
      logger.info(`[PubSub] Admin subscribed to channel ${channel}`);
    }
  });

  // Return unsubscribe function
  return async () => {
    await subscriberClient.unsubscribe(channel);
    subscriberClient.removeListener('message', messageHandler);
    logger.info(`[PubSub] Admin unsubscribed from channel ${channel}`);
  };
}


/**
 * Get number of subscribers to a channel (for monitoring)
 */
export async function getChannelSubscriberCount(userId: number): Promise<number> {
  try {
    const channel = `notifications:${userId}`;
    const result = await publisherClient.pubsub('NUMSUB', channel) as any[];
    return result?.[1] || 0;
  } catch (error: any) {
    logger.error(`[PubSub] Failed to get subscriber count:`, error);
    return 0;
  }
}

/**
 * Close Redis connections (call on app shutdown)
 */
export async function closePubSub(): Promise<void> {
  await publisherClient.quit();
  await subscriberClient.quit();
  logger.info('[PubSub] Redis connections closed');
}

export default {
  publishNotification,
  subscribeToNotifications,
  getChannelSubscriberCount,
  closePubSub,
};

