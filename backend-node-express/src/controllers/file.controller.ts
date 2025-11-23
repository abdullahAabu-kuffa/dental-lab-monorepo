// TODO: File Controller
// Purpose: Handle file upload and download operations
// Usage: Called from file routes
// Responsibility: Implement uploadFile, downloadFile, deleteFile, getFilesByOrder methods
import { Request, Response } from 'express';
import { deleteFileService, getFileById } from '../services/file.service';
import { successResponse, errorResponse } from '../utils/response.util';
import logger from '../utils/logger.util';
import { parseId } from '../utils/helper/checkUser';

/**
 * Delete file from B2 and DB
 * DELETE /api/files/:fileId
 * 
 * Only admins can delete files
 */
export async function deleteFile(req: Request, res: Response): Promise<Response> {
  try {
    const fileId = parseId(req.params.fileId);
    const userRole = (req as any).user?.role;

    // Check if user is admin or owner
    if (userRole !== 'ADMIN' && userRole !== 'OWNER') {
      return res.status(403).json(errorResponse('Only admins can delete files', 403));
    }

    logger.info(`[FileController] Deleting file: ${fileId}`);

    // Verify file exists before deletion
    const file = await getFileById(fileId);
    if (!file) {
      return res.status(404).json(errorResponse('File not found', 404));
    }

    // Delete file
    await deleteFileService(fileId);

    return res.status(200).json(
      successResponse(
        {
          id: fileId,
          b2FileName: file.b2FileName,
          originalName: file.originalName,
        },
        'File deleted successfully'
      )
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileController] Delete error: ${errorMessage}`);
    return res.status(500).json(errorResponse(errorMessage, 500));
  }
}

/**
 * Get file details
 * GET /api/files/:fileId
 */
export async function getFile(req: Request, res: Response): Promise<Response> {
  try {
    const fileId = parseId(req.params.fileId);

    logger.info(`[FileController] Fetching file: ${fileId}`);

    const file = await getFileById(fileId);

    if (!file) {
      return res.status(404).json(errorResponse('File not found', 404));
    }

    return res.status(200).json(
      successResponse(file, 'File fetched successfully')
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[FileController] Get error: ${errorMessage}`);
    return res.status(500).json(errorResponse(errorMessage, 500));
  }
}
