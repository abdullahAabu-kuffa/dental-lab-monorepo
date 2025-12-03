"use client";

import { useState, useEffect } from "react";
import { useAnalyticsSummary } from "../services/hookes/get_analytics";
import { useLoading } from "@/contexts/LoadingContext";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import StatsCard from "../_components/@statecard";
import ErrorMessage from "../_components/@displayerrors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();

  const { data, isLoading, isError, error } = useAnalyticsSummary(from, to);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  if (!data) return null;

  const { kpis, summary } = data;

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={from || ""}
            onChange={(e) => setFrom(e.target.value || undefined)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={to || ""}
            onChange={(e) => setTo(e.target.value || undefined)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={kpis.business.revenue.total.toLocaleString("en-EG", {
            style: "currency",
            currency: kpis.metadata?.currency || "EGP",
          })}
        />
        <StatsCard
          title="Paid Invoices"
          value={kpis.business.revenue.paid.toLocaleString("en-EG", {
            style: "currency",
            currency: kpis.metadata?.currency || "EGP",
          })}
        />
        <StatsCard
          title="Pending Invoices"
          value={kpis.business.revenue.pending.toLocaleString("en-EG", {
            style: "currency",
            currency: kpis.metadata?.currency || "EGP",
          })}
        />
        <StatsCard
          title="Orders in Progress"
          value={kpis.operations.totalOrdersInProgress}
        />
      </div>

      {/* Charts (using pre-built Chart.js configs from backend) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Orders by Status</h2>
          <Bar data={kpis.business.orders.chartData} />
        </div>

        {/* Invoices by Status */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Invoices by Status</h2>
          <Pie data={kpis.business.invoices.chartData} />
        </div>

        {/* Operations completion */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Process Completion</h2>
          <Bar data={kpis.operations.chartData.completion} />
        </div>

        {/* Stuck items (renamed from duration) */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Stuck Items per Process</h2>
          <Bar data={kpis.operations.chartData.stuckItems} />
        </div>
      </div>

      {/* Trends */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Revenue & Orders Over Time</h2>
        <Line data={kpis.trends.chartData} />
      </div>

      {/* Insights + AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="font-semibold mb-2">AI Summary</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">{summary}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 space-y-3">
          <h2 className="font-semibold mb-2">Insights</h2>
          <ul className="space-y-2">
            {kpis.insights.map((insight, idx) => (
              <li
                key={idx}
                className={`border rounded-lg p-3 text-sm ${
                  insight.severity === "critical"
                    ? "border-red-500"
                    : insight.severity === "warning"
                    ? "border-yellow-500"
                    : "border-blue-500"
                }`}
              >
                <div className="font-medium">{insight.title}</div>
                <div className="text-gray-700">{insight.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {insight.metricValue} {insight.metricUnit}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
