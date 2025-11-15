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

// /**
//  * Generate secure download authorization token
//  * This is the RECOMMENDED approach for private buckets
//  *
//  * @param fileNamePrefix - File or folder to authorize (can be full filename for single file)
//  * @param validDurationSeconds - How long token is valid (1 to 604800 seconds)
//  * @param contentDisposition - Optional: force download with specific filename
//  * @returns Download authorization token
//  */
// export async function getDownloadAuthorization(
//   fileNamePrefix: string,
//   validDurationSeconds: number = 3600, // 1 hour default
//   contentDisposition?: string
// ): Promise<string> {
//   try {
//     const auth = await authorize();

//     const requestData: any = {
//       bucketId: process.env.B2_BUCKET_ID!,
//       fileNamePrefix: fileNamePrefix,
//       validDurationInSeconds: validDurationSeconds,
//     };

//     // Optional: force download with specific filename
//     if (contentDisposition) {
//       requestData.b2ContentDisposition = contentDisposition;
//     }

//     // Call B2 API directly (SDK doesn't have this method)
//     const response = await fetch(
//       `${auth.apiUrl}/b2api/v2/b2_get_download_authorization`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: auth.authorizationToken,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       }
//     );

//     if (!response.ok) {
//       const error = (await response.json()) as Record<string, any>;
//       throw new Error(
//         `B2 download auth failed: ${error.message || response.statusText}`
//       );
//     }

//     const data = (await response.json()) as B2DownloadAuthResponse;

//     logger.info(
//       `Download authorization created for: ${fileNamePrefix} (valid for ${validDurationSeconds}s)`
//     );

//     return data.authorizationToken;
//   } catch (error: any) {
//     logger.error(`Failed to get download authorization: ${error.message}`);
//     throw error;
//   }
// }

// /**
//  * Generate secure download URL with time-limited token
//  * This creates a URL that expires and is file-specific
//  */
// export async function generateSecureDownloadUrl(
//   filename: string,
//   validDurationSeconds: number = 3600,
//   forceDownload: boolean = false
// ): Promise<string> {
//   try {
//     const auth = await authorize();

//     // Generate download authorization token for this specific file
//     const contentDisposition = forceDownload
//       ? `attachment; filename="${filename.split("/").pop()}"`
//       : undefined;

//     const downloadToken = await getDownloadAuthorization(
//       filename,
//       validDurationSeconds,
//       contentDisposition
//     );

//     // Build download URL with token
//     const downloadUrl = `${auth.downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${filename}?Authorization=${downloadToken}`;

//     return downloadUrl;
//   } catch (error: any) {
//     logger.error(`Failed to generate secure download URL: ${error.message}`);
//     throw error;
//   }
// }

/**
 * Generate secure download authorization token
 * B2's proper way: uses b2_get_download_authorization API
 */
export async function getDownloadAuthorization(
  fileNamePrefix: string,
  validDurationSeconds: number = 3600,
  contentDisposition?: string
): Promise<{ token: string; downloadUrl: string }> {
  try {
    const auth = await authorize();

    const requestData: Record<string, any> = {
      bucketId: process.env.B2_BUCKET_ID!,
      fileNamePrefix: fileNamePrefix,
      validDurationInSeconds: Math.min(validDurationSeconds, 604800),
    };

    if (contentDisposition) {
      requestData.b2ContentDisposition = contentDisposition;
    }

    const response = await fetch(
      `${auth.apiUrl}/b2api/v2/b2_get_download_authorization`,
      {
        method: "POST",
        headers: {
          Authorization: auth.authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as Record<string, any>;
      throw new Error(
        `B2 download auth failed: ${errorData.message || response.statusText}`
      );
    }

    const data = (await response.json()) as Record<string, any>;

    logger.info(
      `Download authorization created for: ${fileNamePrefix} (valid for ${validDurationSeconds}s)`
    );

    return {
      token: data.authorizationToken,
      downloadUrl: auth.downloadUrl,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to get download authorization: ${errorMessage}`);
    throw error;
  }
}

/**
 * Generate secure download URL with time-limited token
 * IMPORTANT: B2 download authorization tokens must be sent as 'Authorization' header,
 * NOT as query parameter!
 */
export async function generateSecureDownloadUrl(
  filename: string,
  validDurationSeconds: number = 3600,
  forceDownload: boolean = false
): Promise<{ url: string; authToken: string }> {
  try {
    const contentDisposition = forceDownload
      ? `attachment; filename="${filename.split("/").pop()}"`
      : undefined;

    const { token, downloadUrl } = await getDownloadAuthorization(
      filename,
      validDurationSeconds,
      contentDisposition
    );

    // B2 expects authorization as a header, not query param
    // But we return both the URL and token so frontend can use either method
    const urlWithQueryParam = `${downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${filename}?Authorization=${token}`;

    const plainUrl = `${downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${filename}`;

    return {
      url: plainUrl,
      authToken: token,
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
