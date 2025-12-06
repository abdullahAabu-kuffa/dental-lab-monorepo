import { Request, Response, NextFunction } from "express";
import {
  computeKpisOptimized,
  KPIResponse,
} from "../services/analytics.service";
import logger from "../utils/logger.util";
import { successResponse, errorResponse } from "../utils/response.util";
import { summarizeKpis } from "../services/analyticsSummary.service";

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

function parseDate(
  dateString: string | undefined,
  defaultOffset: number
): Date {
  if (!dateString) {
    const date = new Date();
    date.setDate(date.getDate() + defaultOffset);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}. Use YYYY-MM-DD`);
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

function validateDateRange(from: Date, to: Date): void {
  if (from > to) {
    throw new Error("Start date must be before end date");
  }

  const diffDays = Math.floor(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays > 365) {
    throw new Error("Date range cannot exceed 365 days");
  }
}

export async function getKpis(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (req.user?.role !== "ADMIN" && req.user?.role !== "OWNER") {
      res.status(403).json(errorResponse("Admin access required", 403));
      return;
    }

    const toDate = parseDate(req.query.to as string, 1);
    const fromDate = parseDate(req.query.from as string, -30);

    validateDateRange(fromDate, toDate);

    logger.info(`Analytics: Fetching KPIs from ${fromDate} to ${toDate}`);

    const kpis: KPIResponse = await computeKpisOptimized(fromDate, toDate);

    res.status(200).json(successResponse(kpis, "KPIs fetched successfully"));
  } catch (error: any) {
    logger.error("Analytics Controller Error", error);

    if (error.message.includes("Invalid date format")) {
      res.status(400).json(errorResponse(error.message, 400));
      return;
    }
    if (error.message.includes("Date range")) {
      res.status(400).json(errorResponse(error.message, 400));
      return;
    }

    res.status(500).json(errorResponse("Failed to fetch KPIs", 500));
  }
}

export async function getSummary(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (req.user?.role !== "ADMIN" && req.user?.role !== "OWNER") {
      res.status(403).json(errorResponse("Admin access required", 403));
      return;
    }

    const toDate = parseDate(req.query.to as string, 0);
    const fromDate = parseDate(req.query.from as string, -30);

    validateDateRange(fromDate, toDate);

    logger.info(`Analytics: Fetching summary from ${fromDate} to ${toDate}`);

    const kpis: KPIResponse = await computeKpisOptimized(fromDate, toDate);

    let summary: string;

    try {
      summary = await summarizeKpis(kpis); // Hugging Face client
    } catch (err) {
      logger.error(
        "LLM summary failed, falling back to deterministic summary",
        err
      );
      summary = generateTextSummary(kpis);
    }

    res
      .status(200)
      .json(successResponse({ kpis, summary }, "Summary fetched successfully"));
  } catch (error: any) {
    logger.error("Analytics Summary Error", error);

    if (error.message.includes("Invalid date format")) {
      res.status(400).json(errorResponse(error.message, 400));
      return;
    }

    res.status(500).json(errorResponse("Failed to fetch summary", 500));
  }
}

function generateTextSummary(kpis: KPIResponse): string {
  const { business, operations, clients, insights } = kpis;

  let summary = `Period: ${kpis.period.label}\n`;
  summary += `Date Range: ${kpis.period.from.toISOString().split("T")[0]} to ${kpis.period.to.toISOString().split("T")[0]}\n\n`;

  summary += `BUSINESS\n`;
  summary += `Total Revenue: $${business.revenue.total}\n`;
  summary += `Paid: $${business.revenue.paid}\n`;
  summary += `Pending: $${business.revenue.pending}\n`;
  summary += `Overdue: $${business.revenue.overdue}\n`;
  summary += `Total Orders: ${business.orders.totalOrders}\n`;
  summary += `Average Order Value: $${business.orders.averageOrderValue}\n\n`;

  summary += `OPERATIONS\n`;
  summary += `Overall Health: ${operations.overallHealthStatus}\n`;
  summary += `Orders In Progress: ${operations.totalOrdersInProgress}\n`;
  operations.processes.forEach((p) => {
    summary += `${p.process}: ${p.completionRate}% complete (${p.stuckItems} stuck)\n`;
  });
  summary += "\n";

  summary += `TOP CLIENTS\n`;
  clients.topClients.slice(0, 3).forEach((c, i) => {
    summary += `${i + 1}. ${c.clientName}: $${c.totalRevenue} (${c.revenuePercentage}%)\n`;
  });
  summary += `Revenue Concentration: ${clients.concentrationPercentage}%\n\n`;

  summary += `KEY INSIGHTS\n`;
  insights.forEach((insight) => {
    const severityTag =
      insight.severity === "critical"
        ? "[CRITICAL]"
        : insight.severity === "warning"
          ? "[WARNING]"
          : "[INFO]";
    summary += `${severityTag} ${insight.title}: ${insight.description}\n`;
  });
  summary += `\n`;

  summary += `Generated: ${kpis.metadata.generatedAt}\n`;
  summary += `Execution Time: ${kpis.metadata.executionTimeMs}ms\n`;

  return summary;
}
