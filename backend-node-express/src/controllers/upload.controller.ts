import { Request, Response } from 'express';
import { uploadFileToB2 } from '../services/b2.service';
import { successResponse, errorResponse } from '../utils/response.util';
import logger from '../utils/logger.util';
import crypto from 'crypto';
import path from 'path';

/**
 * Upload file
 */
export async function uploadFile(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file provided', 400));
    }

    // Generate unique filename
    const fileExtension = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${fileExtension}`;

    // Upload to B2
    const result = await uploadFileToB2(
      uniqueFilename,
      req.file.buffer,
      req.file.mimetype
    );

    logger.info(`File uploaded: ${result.fileName}`);

    return res.status(200).json(
      successResponse(
        {
          fileId: result.fileId,
          fileName: result.fileName,
          url: result.downloadUrl,
          size: req.file.size,
          mimeType: req.file.mimetype,
        },
        'File uploaded successfully'
      )
    );
  } catch (error: any) {
    logger.error(`Upload error: ${error.message}`);
    return res.status(500).json(errorResponse(error.message, 500));
  }
}
