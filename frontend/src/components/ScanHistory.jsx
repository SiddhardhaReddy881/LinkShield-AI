import { useEffect, useState } from "react";
import API from "../services/api";
import { Trash2 } from "lucide-react";
import { saveAs } from "file-saver";

function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await API.get("/history");
      setHistory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHistory = async (id) => {
    if (!window.confirm("Delete this scan?")) return;

    try {
      await API.delete(`/history/${id}`);
      loadHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm("Clear all scan history?")) return;

    try {
      await API.delete("/history");
      loadHistory();
    } catch (err) {
      console.log(err);
    }
  };
  const exportCSV = () => {
  const headers = [
    "URL",
    "Threat Score",
    "Classification",
    "Country",
    "IP",
    "Scan Date",
  ];

  const rows = history.map((item) => [
    item.url,
    item.threat_score,
    item.classification,
    item.country,
    item.ip,
    item.scan_date,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "LinkShield_Scan_History.csv");
};

  // Search Filter
  const filteredHistory = history.filter((item) =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id="history"
      className="max-w-7xl mx-auto mt-14 px-6"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

          <h2 className="text-3xl font-bold text-white">
            📜 Scan History
          </h2>

          <div className="flex gap-3">

  <button
    onClick={exportCSV}
    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl text-white font-semibold transition"
  >
    📄 Export CSV
  </button>

  <button
    onClick={clearHistory}
    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold transition"
  >
    🗑 Clear History
  </button>

</div>

        </div>

        {/* Search Box */}
        <input
          type="text"
          placeholder="🔍 Search URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 mb-6 p-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {filteredHistory.length === 0 ? (
          <p className="text-gray-400">
            No matching URLs found.
          </p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-800 text-gray-300">

                  <th className="p-4 text-left">URL</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">IP</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredHistory.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-700 hover:bg-slate-800"
                  >

                    <td className="p-4 text-blue-400 break-all">
                      {item.url}
                    </td>

                    <td className="p-4 text-center text-white">
                      {item.threat_score}
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                          item.classification === "SAFE"
                            ? "bg-green-600"
                            : item.classification === "SUSPICIOUS"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      >
                        {item.classification}
                      </span>

                    </td>

                    <td className="p-4 text-center text-white">
                      {item.country}
                    </td>

                    <td className="p-4 text-center text-white">
                      {item.ip}
                    </td>

                    <td className="p-4 text-center text-gray-300">
                      {item.scan_date}
                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() => deleteHistory(item.id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg"
                      >
                        <Trash2 size={18} color="white" />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default ScanHistory;