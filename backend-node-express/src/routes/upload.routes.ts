import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';
import { verifyAccessToken } from '../middlewares/auth.middleware';
import logger from '../utils/logger.util';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      logger.info(`[Upload] File accepted: ${file.originalname}`);
      cb(null, true);
    } else {
      logger.warn(`[Upload] Invalid file type rejected: ${file.mimetype}`);
      cb(new Error('Invalid file type. Only images allowed.'));
    }
  },
});

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload file to B2 and save metadata
 *     description: Uploads image file to Backblaze B2 and saves file metadata to database. Returns file ID for order creation.
 *     tags: [Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, GIF, WebP) - max 10MB
 *     responses:
 *       201:
 *         description: File uploaded successfully to B2 and saved to database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Database file ID (use for order creation)
 *                       example: 1
 *                     b2FileId:
 *                       type: string
 *                       description: Backblaze B2 file ID
 *                     b2FileName:
 *                       type: string
 *                       description: Backblaze B2 file key
 *                     originalName:
 *                       type: string
 *                       example: photo.jpg
 *                     fileSize:
 *                       type: integer
 *                       example: 50599
 *                     fileType:
 *                       type: string
 *                       example: image/jpeg
 *       400:
 *         description: No file provided or invalid file type
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error during upload
 */
router.post('/', verifyAccessToken, upload.single('file'), uploadFile);

export default router;
