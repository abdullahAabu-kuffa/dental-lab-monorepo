import { Request, Response } from 'express';
import { uploadFileToB2 } from '../services/b2.service';
import { prisma } from '../lib/prisma';
import { successResponse, errorResponse } from '../utils/response.util';
import logger from '../utils/logger.util';
import crypto from 'crypto';
import path from 'path';

export async function uploadFile(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file provided', 400));
    }

    // Generate unique filename for B2
    const fileExtension = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${fileExtension}`;

    logger.info(`[Upload] Uploading file: ${req.file.originalname}`);

    // Upload to B2
    const b2Result = await uploadFileToB2(
      uniqueFilename,
      req.file.buffer,
      req.file.mimetype
    );

    // Save file metadata to DB
    const fileRecord = await prisma.file.create({
      data: {
        b2FileId: b2Result.fileId,
        b2FileName: b2Result.fileName,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      },
    });

    logger.info(`[Upload] File saved to DB: ${fileRecord.id}`);

    return res.status(201).json(
      successResponse(
        {
          id: fileRecord.id,                    // ← DB ID (use for order linking)
          b2FileId: b2Result.fileId,
          fileName: b2Result.fileName,
          originalName: req.file.originalname,
          fileSize: req.file.size,
          fileType: req.file.mimetype,
        },
        'File uploaded successfully'
      )
    );
  } catch (error: any) {
    logger.error(`[Upload] Error: ${error.message}`);
    return res.status(500).json(errorResponse(error.message, 500));
  }
}
