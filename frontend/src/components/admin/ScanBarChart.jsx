import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function ScanBarChart({
  totalScans,
  scansToday,
}) {
  const data = [
    {
      name: "Total",
      value: totalScans,
    },
    {
      name: "Today",
      value: scansToday,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-6">
        Scan Overview
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ScanBarChart;