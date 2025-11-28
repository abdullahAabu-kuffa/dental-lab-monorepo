import { Request, Response } from "express";
import {
  ragQuery,
  storeKnowledgeBaseItem,
  bulkImportItems,
  getRAGStatistics,
  clearCache,
} from "../services/rag.service";

/**
 * Query the RAG system
 * POST /api/rag/query
 */
export const queryRag = async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    console.log(`\n[RAG] Query: "${question}"`);
    const startTime = Date.now();

    const result = await ragQuery(question);

    return res.status(200).json({
      success: true,
      data: {
        question,
        answer: result.answer,
        sources: result.sources,
        fromCache: result.cached,
        responseTime: `${result.duration}ms`,
      },
    });
  } catch (error: any) {
    console.error("Query error:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing query",
      error: error.message,
    });
  }
};

/**
 * Add single knowledge base item
 * POST /api/rag/items
 */
export const addKnowledgeBaseItem = async (req: Request, res: Response) => {
  try {
    const { title, category, content, metadata } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and content are required",
      });
    }

    console.log(`\n[RAG] Adding item: ${title}`);

    const result = await storeKnowledgeBaseItem({
      title,
      category,
      content,
      metadata,
    });

    return res.status(201).json({
      success: true,
      data: result,
      message: "Knowledge base item added successfully",
    });
  } catch (error: any) {
    console.error("Add item error:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding knowledge base item",
      error: error.message,
    });
  }
};

/**
 * Bulk import knowledge base items
 * POST /api/rag/bulk-import
 */
export const bulkImport = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items array is required and must not be empty",
      });
    }

    console.log(`\n[RAG] Bulk import: ${items.length} items`);

    const results = await bulkImportItems(items);

    return res.status(201).json({
      success: true,
      data: results,
      message: `${results.length} items imported successfully`,
    });
  } catch (error: any) {
    console.error("Bulk import error:", error);
    return res.status(500).json({
      success: false,
      message: "Error during bulk import",
      error: error.message,
    });
  }
};

/**
 * Get RAG statistics
 * GET /api/rag/stats
 */
export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await getRAGStatistics();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error("Get stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving statistics",
      error: error.message,
    });
  }
};

/**
 * Clear cache
 * POST /api/rag/cache/clear
 */
export const clearRAGCache = async (req: Request, res: Response) => {
  try {
    console.log(`\n[RAG] Clearing cache...`);
    await clearCache();

    return res.status(200).json({
      success: true,
      message: "Cache cleared successfully",
    });
  } catch (error: any) {
    console.error("Clear cache error:", error);
    return res.status(500).json({
      success: false,
      message: "Error clearing cache",
      error: error.message,
    });
  }
};
