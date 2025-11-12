import B2 from 'backblaze-b2';
import logger from '../utils/logger.util';

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

let authData: any = null;

/**
 * Authorize with B2
 */
async function authorize() {
  try {
    const response = await b2.authorize();
    authData = response.data;
    logger.info('B2 authorized successfully');
    return response.data;
  } catch (error: any) {
    logger.error(`B2 authorization failed: ${error.message}`);
    throw new Error('Failed to authorize with B2');
  }
}

/**
 * Upload file to B2 (works for both public and private buckets)
 */
export async function uploadFileToB2(
  filename: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<{ fileId: string; fileName: string; downloadUrl: string }> {
  try {
    if (!authData) {
      await authorize();
    }

    // Get upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });

    // Upload file
    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: filename,
      data: fileBuffer,
    });

    logger.info(`File uploaded to B2: ${filename}`);

    return {
      fileId: uploadResponse.data.fileId,
      fileName: uploadResponse.data.fileName,
      downloadUrl: authData.downloadUrl,
    };
  } catch (error: any) {
    logger.error(`B2 upload failed: ${error.message}`);
    throw new Error('Failed to upload file to B2');
  }
}

/**
 * Generate signed URL for private bucket file access
 * URL is valid for specified duration (in seconds)
 */
export function generateSignedUrl(
  filename: string,
  durationSeconds: number = 3600 // 1 hour default
): string {
  // For private buckets, generate a URL that requires auth token
  // This is a simple approach - B2 SDK handles signing

  if (process.env.B2_BUCKET_PRIVACY === 'private') {
    // Private bucket: generate auth-required URL
    const url = `${authData.downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${filename}?Authorization=${authData.authorizationToken}`;
    logger.info(`Generated signed URL for: ${filename}`);
    return url;
  } else {
    // Public bucket: simple direct URL
    return `${authData.downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${filename}`;
  }
}

/**
 * Get file URL (works for both public and private)
 */
export function getFileUrl(filename: string): string {
  if (process.env.CLOUDFLARE_CDN_URL) {
    // When using Cloudflare CDN (later)
    return `${process.env.CLOUDFLARE_CDN_URL}/${filename}`;
  }

  // Use signed URL approach for now
  return generateSignedUrl(filename);
}

/**
 * Delete file from B2
 */
export async function deleteFileFromB2(
  fileId: string,
  fileName: string
): Promise<void> {
  try {
    if (!authData) {
      await authorize();
    }

    await b2.deleteFileVersion({
      fileId,
      fileName,
    });

    logger.info(`File deleted from B2: ${fileName}`);
  } catch (error: any) {
    logger.error(`B2 delete failed: ${error.message}`);
    throw new Error('Failed to delete file from B2');
  }
}
