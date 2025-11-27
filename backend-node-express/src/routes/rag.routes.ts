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
 * RAG Routes
 */

// Query the RAG system
router.post("/query", queryRag);

// Add single knowledge base item
router.post("/items", addKnowledgeBaseItem);

// Bulk import items
router.post("/bulk-import", bulkImport);

// Get statistics
router.get("/stats", getStats);

// Clear cache
router.post("/cache/clear", clearRAGCache);

export default router;
