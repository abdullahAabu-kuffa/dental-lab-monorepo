import { Router } from "express";
import {
  getAnalyticsKpis,
  getAnalyticsSummary,
} from "../controllers/analytics.controller";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/analytics/kpis:
 *   get:
 *     summary: Get analytics KPIs (raw numbers)
 *     description: Returns key metrics for orders, invoices, operations, and clients for a given period.
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Start date (inclusive) in ISO format. Defaults to 30 days before "to".
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: End date (exclusive) in ISO format. Defaults to now.
 *     responses:
 *       200:
 *         description: KPIs retrieved successfully
 *       500:
 *         description: Error computing KPIs
 */
router.get("/kpis",verifyAccessToken,requireAdmin, getAnalyticsKpis);

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get AI-written analytics summary
 *     description: Returns a natural-language summary of the lab's performance for the given period.
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Start date (inclusive) in ISO format. Defaults to 30 days before "to".
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: End date (exclusive) in ISO format. Defaults to now.
 *     responses:
 *       200:
 *         description: Summary generated successfully
 *       500:
 *         description: Error generating summary
 */
router.get("/summary", verifyAccessToken,requireAdmin, getAnalyticsSummary);

export default router;
