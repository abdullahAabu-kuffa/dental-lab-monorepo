// TODO: File Management Routes
// Purpose: Handle file upload, download, deletion
// Usage: Mount at /api/files in app.ts
// Responsibility: Define  GET /:id, DELETE /:id endpoints

import { Router } from 'express';
import { getFile, deleteFile } from '../controllers/file.controller';
import { verifyAccessToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/files/{fileId}:
 *   get:
 *     summary: Get file details
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *         description: File ID from database
 *     responses:
 *       200:
 *         description: File details retrieved
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:fileId', verifyAccessToken, getFile);

/**
 * @swagger
 * /api/files/{fileId}:
 *   delete:
 *     summary: Delete file (Admin/Owner only)
 *     tags: [Files]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       403:
 *         description: Forbidden - Only admins/owners
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:fileId', verifyAccessToken, deleteFile);

export default router;
