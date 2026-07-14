import { useEffect, useState } from "react";
import API from "../services/api";
import { Trash2 } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";

function ScanHistory({ refresh }) {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHistory();
  }, [refresh]);

  const isLoggedIn = () => {
    return sessionStorage.getItem("user") !== null;
  };

  const loadHistory = async () => {
    try {
      const response = await API.get("/history");
      setHistory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHistory = async (id) => {
    if (!isLoggedIn()) {
      toast.error("Please login first.");
      return;
    }

    if (!window.confirm("Delete this scan?")) return;

    try {
      await API.delete(`/history/${id}`);
      loadHistory();
      toast.success("History deleted.");
    } catch (err) {
      console.log(err);
    }
  };

  const clearHistory = async () => {
    if (!isLoggedIn()) {
      toast.error("Please login first.");
      return;
    }

    if (!window.confirm("Clear all scan history?")) return;

    try {
      await API.delete("/history");
      loadHistory();
      toast.success("History cleared.");
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = () => {
    if (!isLoggedIn()) {
      toast.error("Please login first.");
      return;
    }

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

    toast.success("CSV Exported Successfully");
  };

  const filteredHistory = history.filter((item) =>
    item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      id="history"
      className="max-w-7xl mx-auto mt-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.12)] p-5 md:p-8">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">

          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            📜 Scan History
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            <button
              onClick={exportCSV}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 hover:scale-105 px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300"
            >
              📄 Export CSV
            </button>

            <button
              onClick={clearHistory}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 hover:scale-105 px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300"
            >
              🗑 Clear History
            </button>

          </div>

        </div>

        <input
          type="text"
          placeholder="🔍 Search URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-96 mb-6 p-4 rounded-2xl border border-slate-600 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        {filteredHistory.length === 0 ? (
          <p className="text-gray-400">
            No matching URLs found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-700">

            <table className="w-full min-w-[950px]">

              <thead>

                <tr className="bg-slate-800 text-gray-300">

                  <th className="p-4 text-left">URL</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Country</th>
                  <th className="p-4 text-center">IP Address</th>
                  <th className="p-4 text-center">Scan Time</th>
                  <th className="p-4 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredHistory.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-700 hover:bg-slate-800 transition-all duration-300"
                  >

                    <td className="p-4 text-blue-400 break-all max-w-xs">
                      {item.url}
                    </td>

                    <td className="p-4 text-center text-white">
                      {item.threat_score}
                    </td>

                    <td className="p-4 text-center">

                      <span
                        className={`px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold ${
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
                        className="bg-red-500 hover:bg-red-600 hover:scale-110 p-2 rounded-xl transition-all duration-300"
                      >
                        <Trash2
                          size={18}
                          color="white"
                        />
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