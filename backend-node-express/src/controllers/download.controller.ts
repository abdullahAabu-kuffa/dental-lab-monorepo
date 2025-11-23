import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.util";
import logger from "../utils/logger.util";
import { downloadFileService } from "../services/file.service";
import { parseId } from "../utils/helper/checkUser";

/**
 * Download by file ID
 * GET /api/download/:fileId
 */
export async function downloadByFileId(req: Request, res: Response) :Promise<void | Response>{
  try {
    const fileId = parseId(req.params.fileId);

    const validDuration = 3600;

    logger.info(`[Download] Generating URL for fileId: ${fileId}`);

    // Get file from DB and generate download URL
    const { url } = await downloadFileService(fileId, validDuration);

    // res.setHeader(
    //   "Content-Disposition",
    //   forceDownload ? "attachment" : "inline"
    // );

    return res.redirect(url);
  } catch (error: any) {
    logger.error(`[Download] Error: ${error.message}`);
    return res.status(500).json(errorResponse(error.message, 500));
  }
}
