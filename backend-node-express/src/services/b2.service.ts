import B2 from "backblaze-b2";
import logger from "../utils/logger.util";

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID!,
  applicationKey: process.env.B2_APP_KEY!,
});

let authData: any = null;
let lastAuthTime: number = 0;
const AUTH_REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
interface B2DownloadAuthResponse {
  authorizationToken: string;
  fileNamePrefix: string;
  bucketId: string;
  validDurationInSeconds: number;
}

/**
 * Authorize with B2 (with caching)
 */
async function authorize() {
  try {
    const now = Date.now();
    if (!authData || now - lastAuthTime > AUTH_REFRESH_INTERVAL) {
      const response = await b2.authorize();
      authData = response.data;
      lastAuthTime = now;
      logger.info("B2 authorized successfully");
    }
    return authData;
  } catch (error: any) {
    logger.error(`B2 authorization failed: ${error.message}`);
    throw new Error("Failed to authorize with B2");
  }
}

/**
 * Upload file to B2
 */
export async function uploadFileToB2(
  filename: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<{ fileId: string; fileName: string; downloadUrl: string }> {
  try {
    const auth = await authorize();

    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });

    const uploadData = uploadUrlResponse.data;

    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      fileName: filename,
      data: fileBuffer,
    } as any);

    const uploadResponseData = uploadResponse.data as any;

    logger.info(`File uploaded to B2: ${filename}`);

    return {
      fileId: uploadResponseData.fileId,
      fileName: uploadResponseData.fileName,
      downloadUrl: auth.downloadUrl,
    };
  } catch (error: any) {
    logger.error(`B2 upload failed: ${error.message}`);
    throw new Error(`Failed to upload file to B2: ${error.message}`);
  }
}


/**
 * Generate secure download URL with time-limited token
 */
export async function generateSecureDownloadUrl(
  originalFilename: string,
  filename: string,
  validDurationSeconds: number = 3600,
): Promise<{ url: string }> {
  try {
    const auth = await authorize();
    const contentDisposition = `attachment; filename="${originalFilename}"`;

    const bucketId = process.env.B2_BUCKET_ID!;
    const bucketName = process.env.B2_BUCKET_NAME!;
    const { data: authData } = await b2.getDownloadAuthorization({
      bucketId,
      fileNamePrefix: filename,
      validDurationInSeconds: Math.min(validDurationSeconds, 604800),
      b2ContentDisposition: contentDisposition,
    });
    const token = authData.authorizationToken;
    const downloadUrl = `${auth.downloadUrl}/file/${bucketName}/${encodeURIComponent(filename)}?Authorization=${encodeURIComponent(token)}&b2ContentDisposition=${encodeURIComponent(
      contentDisposition
    )}`;
    return {
      url: downloadUrl,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to generate secure download URL: ${errorMessage}`);
    throw error;
  }
}

/**
 * Delete file from B2
 */
export async function deleteFileFromB2(
  fileId: string,
  fileName: string
): Promise<void> {
  try {
    await authorize();

    await b2.deleteFileVersion({
      fileId,
      fileName,
    });

    logger.info(`File deleted from B2: ${fileName}`);
  } catch (error: any) {
    logger.error(`B2 delete failed: ${error.message}`);
    throw new Error(`Failed to delete file from B2: ${error.message}`);
  }
}

/**
 * Get bucket info
 */
export async function getBucketInfo(): Promise<any> {
  try {
    const auth = await authorize();
    return {
      bucketName: process.env.B2_BUCKET_NAME,
      bucketId: process.env.B2_BUCKET_ID,
      privacy: process.env.B2_BUCKET_PRIVACY,
      apiUrl: auth.apiUrl,
      downloadUrl: auth.downloadUrl,
    };
  } catch (error: any) {
    logger.error(`Failed to get bucket info: ${error.message}`);
    throw error;
  }
}
