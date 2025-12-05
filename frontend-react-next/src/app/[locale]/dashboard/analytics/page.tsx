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
  Filler,
} from "chart.js";
import StatsCard from "../_components/@statecard";
import ErrorMessage from "../_components/@displayerrors";
import { Users, DollarSign, Clock, CheckCircle } from "lucide-react";

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

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <ErrorMessage message={(error as Error).message} />
      </div>
    );

  if (!data) return null;

  const { kpis, summary } = data;

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-10">
      {/* Maximum content width container */}
      <div className="max-w-[1600px] mx-auto">
        {/* Cards Section */}
        <div className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
            {/* Header / Title Area (Full Width) */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                Analytics Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-500">
                Comprehensive analytics and insights
              </p>
            </div>

            {/* Stats Cards Grid */}
            {/* Responsive: 1 col (mobile), 2 cols (tablet), 4 cols (desktop/xl) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="Total Revenue"
                value={kpis.business.revenue.total.toLocaleString("en-EG", {
                  style: "currency",
                  currency: kpis.metadata?.currency || "EGP",
                })}
                growth="+12% this month"
                icon={<DollarSign size={28} className="text-white" />}
                fromColor="from-blue-500"
                toColor="to-blue-600"
              />
              <StatsCard
                title="Paid Invoices"
                value={kpis.business.revenue.paid.toLocaleString("en-EG", {
                  style: "currency",
                  currency: kpis.metadata?.currency || "EGP",
                })}
                growth="+8% this month"
                icon={<CheckCircle size={28} className="text-white" />}
                fromColor="from-green-500"
                toColor="to-green-600"
              />
              <StatsCard
                title="Pending Invoices"
                value={kpis.business.revenue.pending.toLocaleString("en-EG", {
                  style: "currency",
                  currency: kpis.metadata?.currency || "EGP",
                })}
                growth="Awaiting payment"
                icon={<Clock size={28} className="text-white" />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />
              <StatsCard
                title="Orders in Progress"
                value={kpis.operations.totalOrdersInProgress}
                growth="Active orders"
                icon={<Users size={28} className="text-white" />}
                fromColor="from-purple-500"
                toColor="to-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Charts & Filters Section */}
        <div className="px-4 md:px-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">
                From
              </label>
              <input
                type="date"
                value={from || ""}
                onChange={(e) => setFrom(e.target.value || undefined)}
                className="
                  border border-gray-300
                  rounded-lg
                  px-3 py-1.5
                  text-sm
                  text-gray-700
                  bg-white
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500
                  transition
                  duration-200
                  shadow-sm
                "
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600">
                To
              </label>
              <input
                type="date"
                value={to || ""}
                onChange={(e) => setTo(e.target.value || undefined)}
                className="
                  border border-gray-300
                  rounded-lg
                  px-3 py-1.5
                  text-sm
                  text-gray-700
                  bg-white
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  focus:border-blue-500
                  transition
                  duration-200
                  shadow-sm
                "
              />
            </div>
          </div>

          {/* Top Charts Grid */}
          {/* Responsive: 1 col (mobile), 2 cols (lg desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Orders by Status */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                Orders by Status
              </h2>
              <div style={{ height: "250px" }}>
                <Bar
                  data={kpis.business.orders.chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Invoices by Status */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                Invoices by Status
              </h2>
              <div
                className="flex justify-center items-center"
                style={{ height: "250px" }}
              >
                <div style={{ width: "220px", height: "220px" }}>
                  <Pie
                    data={kpis.business.invoices.chartData}
                    options={{
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            boxWidth: 12,
                            padding: 8,
                            font: { size: 10 },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Operations completion */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                Process Completion
              </h2>
              <div style={{ height: "250px" }}>
                <Bar
                  data={kpis.operations.chartData.completion}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Stuck items */}
            <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                Stuck Items per Process
              </h2>
              <div style={{ height: "250px" }}>
                <Bar
                  data={kpis.operations.chartData.stuckItems}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Trends */}
          <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
            <h2 className="font-semibold mb-2 text-sm text-gray-800">
              Revenue & Orders Over Time
            </h2>
            <div style={{ height: "300px" }}>
              <Line
                data={kpis.trends.chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Insights + AI Summary */}
          {/* Responsive: 1 col (mobile), 2 cols (lg desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-3 space-y-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                AI Summary
              </h2>
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {summary}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-3 space-y-3 border border-gray-100">
              <h2 className="font-semibold mb-2 text-sm text-gray-800">
                Insights
              </h2>
              <ul className="space-y-3">
                {kpis.insights.map((insight, idx) => (
                  <li
                    key={idx}
                    className={`border rounded-lg p-3 text-sm ${
                      insight.severity === "critical"
                        ? "border-red-500 bg-red-50"
                        : insight.severity === "warning"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-blue-500 bg-blue-50"
                    }`}
                  >
                    <div className="font-medium text-gray-800">
                      {insight.title}
                    </div>
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
      </div>
    </div>
  );
};

export default AnalyticsPage;
