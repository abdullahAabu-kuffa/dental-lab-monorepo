// TODO: File Service
// Purpose: Handle file operations and B2 integration
// Usage: Called by file controller
// Responsibility: Upload to B2, download from B2, delete files, manage metadata

import { prisma } from '../lib/prisma';
import { deleteFileFromB2 } from './b2.service';
import logger from '../utils/logger.util';

export interface FileResponse {
  id: number;
  b2FileId: string;
  b2FileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Get file by ID
 * Used to fetch file data and use it for operations
 */
export async function getFileById(fileId: number): Promise<FileResponse | null> {
  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      logger.warn(`[FileService] File not found: ${fileId}`);
      return null;
    }

    logger.info(`[FileService] Retrieved file: ${fileId}`);
    return file as FileResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileService] getFileById error: ${errorMessage}`);
    throw error;
  }
}

/**
 * Download file - Get secure download URL
 * Fetches file metadata from DB and generates B2 download URL
 */
export async function downloadFileService(
  fileId: number,
  validDurationSeconds: number = 3600
): Promise<{ url: string;}> {
  try {
    logger.info(`[FileService] Downloading file: ${fileId}`);

    // Get file from DB
    const file = await getFileById(fileId);

    if (!file) {
      throw new Error('File not found');
    }

    // Generate secure download URL from B2
    const { generateSecureDownloadUrl } = await import('./b2.service');
    const downloadData = await generateSecureDownloadUrl(
      file.originalName,
      file.b2FileName,
      validDurationSeconds,
    );

    logger.info(`[FileService] Download URL generated for file: ${fileId}`);

    return {
      url: downloadData.url,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileService] downloadFileService error: ${errorMessage}`);
    throw error;
  }
}

/**
 * Delete file from B2 and mark as deleted in DB
 * Called when order is rejected or file needs to be removed
 */
export async function deleteFileService(fileId: number): Promise<void> {
  try {
    logger.info(`[FileService] Starting file deletion: ${fileId}`);

    // Get file from DB
    const file = await getFileById(fileId);

    if (!file) {
      throw new Error('File not found');
    }

    // Delete from B2
    try {
      logger.info(`[FileService] Deleting from B2: ${file.b2FileName}`);
      await deleteFileFromB2(file.b2FileId, file.b2FileName);
      logger.info(`[FileService] Successfully deleted from B2: ${file.b2FileName}`);
    } catch (b2Error) {
      const b2ErrorMessage = b2Error instanceof Error ? b2Error.message : String(b2Error);
      logger.error(`[FileService] B2 delete failed: ${b2ErrorMessage}`);
      // Continue - still mark as deleted in DB even if B2 delete fails
    }

      // Delete from DB (hard delete)
    await prisma.file.delete({
      where: { id: fileId },
    });

    logger.info(`[FileService] File marked as deleted in DB: ${fileId}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileService] deleteFileService error: ${errorMessage}`);
    throw error;
  }
}

/**
 * Get file by order ID
 * Useful when you need file info based on an order
 */
export async function getFileByOrderId(orderId: number): Promise<FileResponse | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        file: true,
      },
    });

    if (!order || !order.file) {
      logger.warn(`[FileService] Order or file not found: ${orderId}`);
      return null;
    }

    logger.info(`[FileService] Retrieved file for order: ${orderId}`);
    return order.file as FileResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileService] getFileByOrderId error: ${errorMessage}`);
    throw error;
  }
}
