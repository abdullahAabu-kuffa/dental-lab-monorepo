import { Request, Response } from "express";
import { computeKpis } from "../services/analytics.service";
import { summarizeKpis } from "../services/analyticsSummary.service";
import { successResponse } from "../utils/response.util";

function parseDateRangeFromQuery(req: Request): { from: Date; to: Date } {
  const { from, to } = req.query;

  const toDate = to ? new Date(String(to)) : new Date();
  const fromDate = from
    ? new Date(String(from))
    : new Date(toDate.getTime() - 30 * 24 * 60 * 60 * 1000); // default last 30 days

  return { from: fromDate, to: toDate };
}

/**
 * GET /api/analytics/kpis
 * Returns raw KPIs (numbers only) for the selected period.
 */
export const getAnalyticsKpis = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseDateRangeFromQuery(req);
    const kpis = await computeKpis(from, to);

    return res.status(200).json(successResponse(kpis));
  } catch (error: any) {
    console.error("Analytics KPIs error:", error);
    return res.status(500).json({
      success: false,
      message: "Error computing analytics KPIs",
      error: error.message,
    });
  }
};

/**
 * GET /api/analytics/summary
 * Returns only the AI-generated summary string for the selected period.
 */
export const getAnalyticsSummary = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseDateRangeFromQuery(req);
    const kpis = await computeKpis(from, to);
    const summary = await summarizeKpis(kpis);

    return res.status(200).json(
      successResponse({
        summary,
        period: kpis.period,
      })
    );
  } catch (error: any) {
    console.error("Analytics summary error:", error);
    return res.status(500).json({
      success: false,
      message: "Error generating analytics summary",
      error: error.message,
    });
  }
};
