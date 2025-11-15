import { Router } from 'express';
import { getDownloadUrl } from '../controllers/download.controller';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/download/url/{filename}:
 *   get:
 *     summary: Get secure download URL and auth token for a file
 *     tags: [Download]
 *     description: Returns B2 download URL and time-limited authorization token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Filename stored in B2
 *         example: 1762915011090-7dc760c4d9163fef.jpg
 *       - in: query
 *         name: duration
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 604800
 *           default: 3600
 *         description: URL validity in seconds (1 hour default, max 1 week)
 *       - in: query
 *         name: asAttachment
 *         schema:
 *           type: boolean
 *           default: false
 *         description: true = force download, false = view inline
 *     responses:
 *       200:
 *         description: Download URL and token generated successfully
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
 *                     url:
 *                       type: string
 *                       description: B2 download URL
 *                     authToken:
 *                       type: string
 *                       description: Time-limited authorization token
 *                     filename:
 *                       type: string
 *                     expiresIn:
 *                       type: integer
 *                       description: Seconds until token expires
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                     disposition:
 *                       type: string
 *                       enum: [inline, attachment]
 *       400:
 *         description: Invalid filename
 *       401:
 *         description: Unauthorized
 */
router.get('/url/:filename', verifyAccessToken, getDownloadUrl);

export default router;
