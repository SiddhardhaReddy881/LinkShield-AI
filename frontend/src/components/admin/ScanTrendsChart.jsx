import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ScanTrendsChart({ trends }) {
  const [timeframe, setTimeframe] = useState("daily"); // daily, weekly, monthly

  if (!trends) return null;

  const getChartData = () => {
    switch (timeframe) {
      case "weekly":
        return trends.weekly.map((item) => ({
          name: `Wk ${item.week.split("-")[1] || item.week}`,
          scans: item.count,
        }));
      case "monthly":
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return trends.monthly.map((item) => {
          const monthNum = parseInt(item.month.split("-")[1], 10);
          const monthName = !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12
            ? monthNames[monthNum - 1]
            : item.month;
          return {
            name: monthName,
            scans: item.count,
          };
        });
      case "daily":
      default:
        return trends.daily.map((item) => {
          // format YYYY-MM-DD to MM-DD
          const parts = item.date.split("-");
          const dateStr = parts.length >= 3 ? `${parts[1]}-${parts[2]}` : item.date;
          return {
            name: dateStr,
            scans: item.count,
          };
        });
    }
  };

  const chartData = getChartData();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">Scan Trends</h2>
          <p className="text-xs text-slate-400 mt-1">
            Historical overview of scanned links
          </p>
        </div>

        {/* Timeframe Toggles */}
        <div className="flex bg-slate-800 p-1 rounded-xl self-start sm:self-auto border border-slate-700">
          {["daily", "weekly", "monthly"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all capitalize ${
                timeframe === t
                  ? "bg-green-500 text-black shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 350 }}>
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No historical scans recorded for this timeframe.
          </div>
        ) : (
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="scans"
                stroke="#22c55e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScans)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ScanTrendsChart;
