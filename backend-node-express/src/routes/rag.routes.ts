import { Router, Request, Response } from "express";
import {
  queryRag,
  addKnowledgeBaseItem,
  bulkImport,
  getStats,
  clearRAGCache,
} from "../controllers/rag.controller";

const router = Router();

/**
 * @swagger
 * /api/rag/query:
 *   post:
 *     summary: Query the RAG system
 *     description: Submit a question to the RAG system. It will search the knowledge base using pgvector similarity search and return an AI-generated answer with sources.
 *     tags:
 *       - RAG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is zirconia used for?"
 *                 description: The question to ask the RAG system
 *     responses:
 *       200:
 *         description: Successfully generated answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     answer:
 *                       type: string
 *                       example: "Zirconia is a high-strength ceramic used for..."
 *                     responseTime:
 *                       type: string
 *                       example: "2543ms"
 *       400:
 *         description: Question is required
 *       500:
 *         description: Error processing query
 */
router.post("/query", queryRag);

/**
 * @swagger
 * /api/rag/items:
 *   post:
 *     summary: Add a single knowledge base item
 *     description: Add a new material or document to the knowledge base with automatic embedding generation.
 *     tags:
 *       - RAG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Zirconia Crown"
 *                 description: Title of the knowledge base item
 *               category:
 *                 type: string
 *                 example: "Materials"
 *                 description: Category for organizing items
 *               content:
 *                 type: string
 *                 example: "High-strength ceramic crown for posterior teeth..."
 *                 description: Main content/description of the item
 *               metadata:
 *                 type: object
 *                 example: { "lifespan_years": 10, "strength_mpa": 800, "price": 150 }
 *                 description: Optional metadata as key-value pairs
 *     responses:
 *       201:
 *         description: Knowledge base item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "42"
 *                 message:
 *                   type: string
 *                   example: "Knowledge base item added successfully"
 *       400:
 *         description: Title, category, and content are required
 *       500:
 *         description: Error adding knowledge base item
 */
router.post("/items", addKnowledgeBaseItem);

/**
 * @swagger
 * /api/rag/bulk-import:
 *   post:
 *     summary: Bulk import knowledge base items
 *     description: Import multiple materials/documents to the knowledge base at once. Each item will have an embedding generated automatically.
 *     tags:
 *       - RAG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - category
 *                     - content
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "Zirconia Crown"
 *                     category:
 *                       type: string
 *                       example: "Materials"
 *                     content:
 *                       type: string
 *                       example: "High-strength ceramic crown..."
 *                     metadata:
 *                       type: object
 *                       example: { "price": 150 }
 *     responses:
 *       201:
 *         description: Items imported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                 message:
 *                   type: string
 *                   example: "6 items imported successfully"
 *       400:
 *         description: Items array is required and must not be empty
 *       500:
 *         description: Error during bulk import
 */
router.post("/bulk-import", bulkImport);

/**
 * @swagger
 * /api/rag/stats:
 *   get:
 *     summary: Get RAG statistics
 *     description: Retrieve statistics about the knowledge base and cache, including total items stored and cached queries.
 *     tags:
 *       - RAG
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 42
 *                       description: Total items in knowledge base
 *                     cachedQueries:
 *                       type: integer
 *                       example: 15
 *                       description: Number of cached query results
 *       500:
 *         description: Error retrieving statistics
 */
router.get("/stats", getStats);

/**
 * @swagger
 * /api/rag/cache/clear:
 *   post:
 *     summary: Clear RAG cache
 *     description: Clear all cached query results. Useful after bulk imports or when stale data needs to be refreshed.
 *     tags:
 *       - RAG
 *     responses:
 *       200:
 *         description: Cache cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cache cleared successfully"
 *       500:
 *         description: Error clearing cache
 */
router.post("/cache/clear", clearRAGCache);

export default router;
