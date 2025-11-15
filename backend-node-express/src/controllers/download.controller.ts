import { Request, Response } from "express";
import { generateSecureDownloadUrl } from "../services/b2.service";
import { successResponse, errorResponse } from "../utils/response.util";
import logger from "../utils/logger.util";

/**
 * Get secure download URL and authorization token
 * Frontend will use these to fetch the file directly from B2
 */
export async function getDownloadUrl(req: Request, res: Response) {
  try {
    const { filename } = req.params;
    const { duration, asAttachment } = req.query;

    if (!filename) {
      return res.status(400).json(errorResponse("Filename is required", 400));
    }

    // Parse and validate duration (1 hour default, 1 week max)
    const validDuration = duration
      ? Math.min(parseInt(duration as string), 604800)
      : 3600;

    // Determine disposition (attachment = force download, inline = view)
    const forceDownload = asAttachment === "true";

    // Generate secure download URL and token
    const { url, authToken } = await generateSecureDownloadUrl(
      filename,
      validDuration,
      forceDownload
    );

    logger.info(
      `Download URL generated for: ${filename} ` +
        `(valid for ${validDuration}s, disposition: ${forceDownload ? "attachment" : "inline"})`
    );

    return res.status(200).json(
      successResponse(
        {
          url,
          authToken,
          filename,
          expiresIn: validDuration,
          expiresAt: new Date(Date.now() + validDuration * 1000).toISOString(),
          disposition: forceDownload ? "attachment" : "inline",
        },
        "Download URL and token generated successfully"
      )
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Download URL generation error: ${errorMessage}`);
    return res.status(500).json(errorResponse(errorMessage, 500));
  }
}
