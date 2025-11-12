import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';
import { verifyAccessToken } from '../middlewares/auth.middleware';

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
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images allowed.'));
    }
  },
});

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: Upload file to cloud storage
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file provided or invalid file type
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyAccessToken, upload.single('file'), uploadFile);

export default router;
