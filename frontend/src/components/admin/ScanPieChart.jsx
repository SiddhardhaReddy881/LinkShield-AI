import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

function ScanPieChart({
  safe,
  suspicious,
  malicious,
}) {
  const data = [
    {
      name: "Safe",
      value: safe,
    },
    {
      name: "Suspicious",
      value: suspicious,
    },
    {
      name: "Malicious",
      value: malicious,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 shadow-xl">
      <h2 className="text-white text-2xl font-bold mb-6">
        Scan Classification
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ScanPieChart;