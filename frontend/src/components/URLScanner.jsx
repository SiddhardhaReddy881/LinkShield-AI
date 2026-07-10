import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import API from "../services/api";
import Dashboard from "./Dashboard";

function URLScanner({ onScanComplete }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/scan", {
        url: url.trim(),
      });

      setResult(response.data);

      toast.success("Scan completed successfully!");

      if (onScanComplete) {
        onScanComplete();
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data?.message || "Backend Error");
      } else {
        toast.error("Unable to connect to backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleScan();
    }
  };

  return (
    <section
      id="scanner"
      className="bg-slate-950 py-16 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-white text-center mb-3">
            🔗 LinkShield AI Scanner
          </h2>

          <p className="text-center text-gray-400 mb-10">
            Scan suspicious URLs using AI, VirusTotal, WHOIS,
            SSL, Google Safe Browsing and DNS Intelligence.
          </p>

          <div className="flex flex-col md:flex-row gap-5">

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 text-white text-lg outline-none focus:border-green-500"
            />

            <button
              onClick={handleScan}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed px-10 py-5 rounded-xl text-white font-bold flex items-center justify-center gap-3 transition"
            >
              {loading ? (
                <>
                  <ClipLoader
                    size={20}
                    color="#ffffff"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={22} />
                  Scan URL
                </>
              )}
            </button>

          </div>

          {loading && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 bg-slate-900 border border-green-500 rounded-2xl p-6"
            >

              <h3 className="text-green-400 text-xl font-bold mb-5">
                🔍 Security Analysis in Progress
              </h3>

              <div className="space-y-3 text-gray-300">

                <div>✅ Validating URL Format</div>

                <div>🌍 Performing WHOIS Lookup</div>

                <div>🔒 Checking SSL Certificate</div>

                <div>📡 Fetching DNS Records</div>

                <div>🦠 Querying VirusTotal</div>

                <div>🛡 Google Safe Browsing Analysis</div>

                <div>🤖 AI Threat Prediction</div>

                <div>📊 Generating Security Report</div>

              </div>

              <div className="mt-6">

                <ClipLoader
                  size={35}
                  color="#22c55e"
                />

              </div>

            </motion.div>

          )}

        </div>

        {result && (

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <Dashboard data={result} />

          </motion.div>

        )}

      </motion.div>
    </section>
  );
}

export default URLScanner;