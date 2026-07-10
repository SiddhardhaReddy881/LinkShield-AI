import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

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

import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Database,
} from "lucide-react";

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

  const averageScore =
    total > 0
      ? (
          history.reduce(
            (sum, item) => sum + item.threat_score,
            0
          ) / total
        ).toFixed(1)
      : 0;

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

  const cards = [
    {
      title: "Total Scans",
      value: total,
      icon: Database,
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Safe URLs",
      value: safe,
      icon: ShieldCheck,
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Suspicious",
      value: suspicious,
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Malicious",
      value: malicious,
      icon: ShieldAlert,
      color: "from-red-600 to-pink-600",
    },
  ];

  return (
    <section
      id="analytics"
      className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.12)] p-5 md:p-8">

        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10">
          📊 Analytics Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className={`bg-gradient-to-br ${card.color} rounded-3xl p-5 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <Icon
                  size={34}
                  className="text-white mb-4"
                />

                <p className="text-white text-base md:text-lg">
                  {card.title}
                </p>

             <h3 className="text-4xl md:text-5xl font-bold text-white mt-4">
  {card.value}
</h3>
              </motion.div>
            );
          })}

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mt-10">

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-slate-800 rounded-3xl border border-slate-700 p-5 md:p-8 shadow-lg"
          >

            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Threat Distribution
            </h3>

           <ResponsiveContainer width="100%" height={350}>
  <BarChart data={chartData}>
    <CartesianGrid
      stroke="#475569"
      strokeDasharray="3 3"
    />

   <XAxis
  dataKey="name"
  stroke="#ffffff"
  interval={0}
  angle={-20}
  textAnchor="end"
  height={60}
/>

    <YAxis
      stroke="#ffffff"
    />

    <Tooltip />

    <Bar
      dataKey="count"
      radius={[10, 10, 0, 0]}
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

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-slate-800 rounded-3xl border border-slate-700 p-5 md:p-8 shadow-lg"
          >

            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Overall Statistics
            </h3>

            <div className="space-y-6 md:space-y-8">

              <div>

                <p className="text-gray-400">
                  Average Threat Score
                </p>

               <h2 className="text-4xl md:text-5xl font-bold text-green-400 mt-2">
  {averageScore}
</h2>

              </div>

              <div>

                <p className="text-gray-400">
                  Security Status
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {malicious === 0
                    ? "Excellent"
                    : suspicious > malicious
                    ? "Moderate"
                    : "High Risk"}
                </h2>

              </div>

              <div>

                <p className="text-gray-400">
                  Last Scan Count
                </p>

               <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mt-2">
  {total}
</h2>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default Analytics;