"use client";

import { useQuery } from "@tanstack/react-query";

// match backend success response wrapper
interface ApiSuccess<T> {
  status: "success";
  message?: string;
  data: T;
}

// --------------------
// Analytics types (keep in sync with backend analytics.service.ts)
// --------------------

type HealthStatus = "healthy" | "warning" | "critical";
type InsightSeverity = "info" | "warning" | "critical";

interface DateRange {
  // backend uses Date, but over JSON these are ISO strings
  from: string;
  to: string;
  label: string;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartConfig {
  labels: string[];
  datasets: ChartDataset[];
}

interface ProcessMetrics {
  process: string;
  completionRate: number;
  totalItems: number;
  completedItems: number;
  stuckItems: number;
  averageDuration: number;
  healthStatus: HealthStatus;
  healthReason: string;
}

interface ClientMetric {
  clientId: number;
  clientName: string;
  totalRevenue: number;
  orderCount: number;
  revenuePercentage: number;
}

interface BusinessMetrics {
  revenue: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  invoices: {
    byStatus: Record<
      string,
      {
        count: number;
        amount: number;
        percentage: number;
      }
    >;
    chartData: ChartConfig;
  };
  orders: {
    byStatus: Record<
      string,
      {
        count: number;
        percentage: number;
      }
    >;
    totalOrders: number;
    averageOrderValue: number;
    chartData: ChartConfig;
  };
}

interface OperationsMetrics {
  processes: ProcessMetrics[];
  overallHealthStatus: HealthStatus;
  totalOrdersInProgress: number;
  chartData: {
    completion: ChartConfig;
    stuckItems: ChartConfig;
  };
}

interface TrendMetrics {
  daily: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  chartData: ChartConfig;
}

interface Insight {
  title: string;
  description: string;
  severity: InsightSeverity;
  metricValue: number;
  metricUnit: string;
}

export interface KPIResponse {
  period: DateRange;
  business: BusinessMetrics;
  operations: OperationsMetrics;
  clients: {
    topClients: ClientMetric[];
    concentrationPercentage: number;
    chartData: ChartConfig;
  };
  trends: TrendMetrics;
  insights: Insight[];
  metadata: {
    generatedAt: string;
    executionTimeMs: number;
    // make currency optional so it still compiles even before you add it on backend
    currency?: string;
  };
}

interface AnalyticsSummaryData {
  kpis: KPIResponse;
  summary: string;
}

// --------------------
// Hook
// --------------------

export function useAnalyticsSummary(from?: string, to?: string) {
  return useQuery<AnalyticsSummaryData>({
    queryKey: ["analytics-summary", { from, to }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const res = await fetch(`/api/analytics/summary?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const json = (await res.json()) as ApiSuccess<AnalyticsSummaryData>;
      return json.data;
    },
  });
}
