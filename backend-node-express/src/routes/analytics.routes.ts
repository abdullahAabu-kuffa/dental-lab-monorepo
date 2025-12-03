import { Router } from "express";
import { getKpis, getSummary } from "../controllers/analytics.controller";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";

const router = Router();

/**
 * @swagger
 * /api/analytics/kpis:
 *   get:
 *     summary: Get analytics KPIs with charts data
 *     description: Fetch comprehensive analytics KPIs including business metrics, operations analysis, client insights, and trends. All chart data is pre-formatted for Chart.js rendering. Admin only.
 *     tags:
 *       - Analytics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-11-01"
 *         description: Start date in YYYY-MM-DD format (default is 30 days ago)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-01"
 *         description: End date in YYYY-MM-DD format (default is today)
 *     responses:
 *       200:
 *         description: KPIs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     period:
 *                       type: object
 *                       properties:
 *                         from:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-11-01T00:00:00.000Z"
 *                         to:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-12-01T00:00:00.000Z"
 *                         label:
 *                           type: string
 *                           example: "Last 30 days"
 *                     business:
 *                       type: object
 *                       properties:
 *                         revenue:
 *                           type: object
 *                           properties:
 *                             total:
 *                               type: number
 *                               example: 100000
 *                               description: Total revenue in dollars
 *                             paid:
 *                               type: number
 *                               example: 80000
 *                               description: Paid invoices in dollars
 *                             pending:
 *                               type: number
 *                               example: 15000
 *                               description: Pending invoices in dollars
 *                             overdue:
 *                               type: number
 *                               example: 5000
 *                               description: Overdue/partial invoices in dollars
 *                         invoices:
 *                           type: object
 *                           properties:
 *                             byStatus:
 *                               type: object
 *                               additionalProperties:
 *                                 type: object
 *                                 properties:
 *                                   count:
 *                                     type: integer
 *                                     example: 45
 *                                   amount:
 *                                     type: number
 *                                     example: 80000
 *                                   percentage:
 *                                     type: number
 *                                     example: 80
 *                             chartData:
 *                               type: object
 *                               properties:
 *                                 labels:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                   example: ["PAID", "PENDING", "PARTIAL"]
 *                                 datasets:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       label:
 *                                         type: string
 *                                         example: "Invoice Amount"
 *                                       data:
 *                                         type: array
 *                                         items:
 *                                           type: number
 *                                         example: [80000, 15000, 5000]
 *                                       backgroundColor:
 *                                         type: array
 *                                         items:
 *                                           type: string
 *                                         example: ["rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(59, 130, 246, 0.8)"]
 *                                   description: Chart.js compatible datasets, ready to render with Doughnut component
 *                         orders:
 *                           type: object
 *                           properties:
 *                             byStatus:
 *                               type: object
 *                               additionalProperties:
 *                                 type: object
 *                                 properties:
 *                                   count:
 *                                     type: integer
 *                                   percentage:
 *                                     type: number
 *                             totalOrders:
 *                               type: integer
 *                               example: 120
 *                             averageOrderValue:
 *                               type: number
 *                               example: 833.33
 *                             chartData:
 *                               type: object
 *                               description: Chart.js compatible data for Bar chart
 *                     operations:
 *                       type: object
 *                       properties:
 *                         processes:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               process:
 *                                 type: string
 *                                 example: "Design"
 *                               completionRate:
 *                                 type: integer
 *                                 example: 92
 *                               totalItems:
 *                                 type: integer
 *                                 example: 50
 *                               completedItems:
 *                                 type: integer
 *                                 example: 46
 *                               stuckItems:
 *                                 type: integer
 *                                 example: 0
 *                               averageDuration:
 *                                 type: number
 *                                 example: 0
 *                               healthStatus:
 *                                 type: string
 *                                 enum: ["healthy", "warning", "critical"]
 *                                 example: "healthy"
 *                               healthReason:
 *                                 type: string
 *                                 example: "Completion above 80%, minimal stuck items"
 *                         overallHealthStatus:
 *                           type: string
 *                           enum: ["healthy", "warning", "critical"]
 *                           example: "warning"
 *                         totalOrdersInProgress:
 *                           type: integer
 *                           example: 12
 *                         chartData:
 *                           type: object
 *                           properties:
 *                             completion:
 *                               type: object
 *                               description: Chart.js data for Line chart showing completion rates
 *                             duration:
 *                               type: object
 *                               description: Chart.js data for Bar chart showing stuck items
 *                     clients:
 *                       type: object
 *                       properties:
 *                         topClients:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               clientId:
 *                                 type: integer
 *                                 example: 1
 *                               clientName:
 *                                 type: string
 *                                 example: "Clinic A"
 *                               totalRevenue:
 *                                 type: number
 *                                 example: 45000
 *                               orderCount:
 *                                 type: integer
 *                                 example: 120
 *                               revenuePercentage:
 *                                 type: number
 *                                 example: 45
 *                         concentrationPercentage:
 *                           type: number
 *                           example: 62
 *                           description: Percentage of revenue from top 3 clients
 *                         chartData:
 *                           type: object
 *                           description: Chart.js data for Bar chart showing client revenue
 *                     trends:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                                 example: "2025-11-01"
 *                               revenue:
 *                                 type: number
 *                                 example: 3200
 *                               orders:
 *                                 type: integer
 *                                 example: 8
 *                         chartData:
 *                           type: object
 *                           description: Chart.js data for Line chart with dual axes (revenue and orders)
 *                     insights:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "High Revenue Concentration"
 *                           description:
 *                             type: string
 *                             example: "More than 60% of revenue comes from top 3 clients. Consider diversifying."
 *                           severity:
 *                             type: string
 *                             enum: ["info", "warning", "critical"]
 *                             example: "warning"
 *                           metricValue:
 *                             type: number
 *                             example: 62
 *                           metricUnit:
 *                             type: string
 *                             example: "percent"
 *                     metadata:
 *                       type: object
 *                       properties:
 *                         generatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-12-03T04:48:00.000Z"
 *                         executionTimeMs:
 *                           type: integer
 *                           example: 742
 *                           description: Time taken to compute all KPIs
 *                 message:
 *                   type: string
 *                   example: "KPIs fetched successfully"
 *       400:
 *         description: Invalid date format or date range exceeds 365 days
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid date format: invalid-date. Use YYYY-MM-DD"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *       403:
 *         description: Unauthorized - Admin or Owner role required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Admin access required"
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch KPIs"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 */
router.get("/kpis", verifyAccessToken, requireAdmin, getKpis);

/**
 * @swagger
 * /api/analytics/summary:
 *   get:
 *     summary: Get analytics summary with readable text report
 *     description: Fetch KPIs with additional readable text summary. Response includes all KPI data plus a formatted text summary. Admin only.
 *     tags:
 *       - Analytics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-11-01"
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-01"
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     KPIs:
 *                       type: string
 *                       description: object containing all KPIs
 *                     summary:
 *                       type: string
 *                       description: Readable text summary of analytics (same as /kpis response + summary field)
 *                       example: "Period: Last 30 days\nDate Range: 2025-11-01 to 2025-12-01\n\nBUSINESS\nTotal Revenue: $100000\nPaid: $80000\nPending: $15000\nOverdue: $5000\nTotal Orders: 120\nAverage Order Value: $833.33\n\nOPERATIONS\nOverall Health: warning\nOrders In Progress: 12\nDesign: 92% complete (0 stuck)\nManufacturing: 65% complete (3 stuck)\n\nTOP CLIENTS\n1. Clinic A: $45000 (45%)\n2. Clinic B: $35000 (35%)\n3. Clinic C: $12000 (12%)\nRevenue Concentration: 62%\n\nKEY INSIGHTS\n[WARNING] High Revenue Concentration: More than 60% of revenue comes from top 3 clients. Consider diversifying.\n[CRITICAL] Process Bottlenecks: Manufacturing below 60% completion.\n\nGenerated: 2025-12-03T04:48:00.000Z\nExecution Time: 742ms"
 *                 message:
 *                   type: string
 *                   example: "Summary fetched successfully"
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
router.get("/summary", verifyAccessToken, requireAdmin, getSummary);

export default router;
