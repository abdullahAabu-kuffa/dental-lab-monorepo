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
import { Users } from "lucide-react";

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
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Cards Section */}
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Title */}
            <div className="lg:col-span-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mb-4 md:mb-0">
                Comprehensive analytics and insights
              </p>
            </div>

            {/* Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <StatsCard
                title="Total Revenue"
                value={kpis.business.revenue.total.toLocaleString("en-EG", {
                  style: "currency",
                  currency: kpis.metadata?.currency || "EGP",
                })}
                growth="+12% this month"
                icon={<Users size={28} />}
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
                icon={<Users size={28} />}
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
                icon={<Users size={28} />}
                fromColor="from-yellow-500"
                toColor="to-yellow-600"
              />
              <StatsCard
                title="Orders in Progress"
                value={kpis.operations.totalOrdersInProgress}
                growth="Active orders"
                icon={<Users size={28} />}
                fromColor="from-purple-500"
                toColor="to-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-medium mb-1 text-gray-600">From</label>
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
                hover:shadow-md
              "
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 text-gray-600">To</label>
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
                hover:shadow-md
              "
            />
          </div>
        </div>

        {/* Charts (using pre-built Chart.js configs from backend) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Orders by Status */}
          <div className="bg-white rounded-lg shadow p-3">
            <h2 className="font-semibold mb-2 text-sm">Orders by Status</h2>
            <div style={{ height: '250px' }}>
              <Bar 
                data={kpis.business.orders.chartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Invoices by Status */}
          <div className="bg-white rounded-lg shadow p-3">
            <h2 className="font-semibold mb-2 text-sm">Invoices by Status</h2>
            <div className="flex justify-center items-center" style={{ height: '250px' }}>
              <div style={{ width: '220px', height: '220px' }}>
                <Pie 
                  data={kpis.business.invoices.chartData}
                  options={{
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 8,
                          font: { size: 10 }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Operations completion */}
          <div className="bg-white rounded-lg shadow p-3">
            <h2 className="font-semibold mb-2 text-sm">Process Completion</h2>
            <div style={{ height: '250px' }}>
              <Bar 
                data={kpis.operations.chartData.completion}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Stuck items (renamed from duration) */}
          <div className="bg-white rounded-lg shadow p-3">
            <h2 className="font-semibold mb-2 text-sm">Stuck Items per Process</h2>
            <div style={{ height: '250px' }}>
              <Bar 
                data={kpis.operations.chartData.stuckItems}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        {/* Trends */}
        <div className="bg-white rounded-lg shadow p-3">
          <h2 className="font-semibold mb-2 text-sm">Revenue & Orders Over Time</h2>
          <div style={{ height: '300px' }}>
            <Line 
              data={kpis.trends.chartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Insights + AI Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-3 space-y-3">
            <h2 className="font-semibold mb-2 text-sm">AI Summary</h2>
            <p className="whitespace-pre-wrap text-sm text-gray-700">{summary}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-3 space-y-3">
            <h2 className="font-semibold mb-2 text-sm">Insights</h2>
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
    </div>
  );
};

export default AnalyticsPage;
