import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await API.get("/history");
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = history.length;

  const safe = history.filter(
    (item) => item.classification === "SAFE"
  ).length;

  const suspicious = history.filter(
    (item) => item.classification === "SUSPICIOUS"
  ).length;

  const malicious = history.filter(
    (item) => item.classification === "MALICIOUS"
  ).length;

  const chartData = [
    {
      name: "SAFE",
      count: safe,
      color: "#22c55e",
    },
    {
      name: "SUSPICIOUS",
      count: suspicious,
      color: "#facc15",
    },
    {
      name: "MALICIOUS",
      count: malicious,
      color: "#ef4444",
    },
  ];

  return (
    <div
  id="analytics"
  className="max-w-7xl mx-auto mt-14 px-6"
>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-white mb-8">
          📊 Analytics Dashboard
        </h2>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-800 rounded-xl p-6 text-center">

            <h3 className="text-gray-400">
              Total Scans
            </h3>

            <p className="text-4xl font-bold text-white mt-3">
              {total}
            </p>

          </div>

          <div className="bg-green-700 rounded-xl p-6 text-center">

            <h3 className="text-white">
              Safe URLs
            </h3>

            <p className="text-4xl font-bold text-white mt-3">
              {safe}
            </p>

          </div>

          <div className="bg-yellow-500 rounded-xl p-6 text-center">

            <h3 className="text-white">
              Suspicious
            </h3>

            <p className="text-4xl font-bold text-white mt-3">
              {suspicious}
            </p>

          </div>

          <div className="bg-red-600 rounded-xl p-6 text-center">

            <h3 className="text-white">
              Malicious
            </h3>

            <p className="text-4xl font-bold text-white mt-3">
              {malicious}
            </p>

          </div>

        </div>

        {/* Threat Distribution */}

        <div className="bg-slate-800 rounded-xl p-8">

          <h3 className="text-2xl font-bold text-white mb-8">
            Threat Distribution
          </h3>

          <div style={{ width: "100%", height: 400 }}>

            <ResponsiveContainer>

              <BarChart
                data={chartData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#475569"
                />

                <XAxis
                  dataKey="name"
                  stroke="#ffffff"
                />

                <YAxis
                  stroke="#ffffff"
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={entry.color}
                    />

                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;