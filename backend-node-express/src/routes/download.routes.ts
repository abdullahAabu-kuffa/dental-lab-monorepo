import { Router } from 'express';
import { downloadByFileId } from '../controllers/download.controller';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/download/{fileId}:
 *   get:
 *     summary: Download file by ID
 *     description: Generates secure B2 download URL and redirects user. File auth token is automatically managed server-side for security.
 *     tags: [Download]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: File ID from database
 *         example: 1
 *     responses:
 *       302:
 *         description: Redirect to B2 secure download URL
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: B2 download URL with authorization token
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error generating download URL
 */
router.get('/:fileId', verifyAccessToken, downloadByFileId);

export default router;
