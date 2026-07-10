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
  const [progress, setProgress] = useState(0);

  const handleScan = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 250);

      const response = await API.post("/scan", {
        url: url.trim(),
      });

      clearInterval(timer);
      setProgress(100);

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
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
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
      className="bg-slate-950 py-14 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.12)] p-5 md:p-10">

          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4">
            🔗 LinkShield AI Scanner
          </h2>

          <p className="text-center text-gray-400 text-sm md:text-lg mb-8 md:mb-10 max-w-3xl mx-auto">
            Scan suspicious URLs using AI, VirusTotal, WHOIS,
            SSL, Google Safe Browsing and DNS Intelligence.
          </p>

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="w-full flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 md:px-6 md:py-5 text-white text-base md:text-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition"
            />

            <button
              onClick={handleScan}
              disabled={loading}
              className="w-full lg:w-auto bg-green-500 hover:bg-green-600 hover:scale-105 disabled:bg-gray-700 disabled:cursor-not-allowed px-8 md:px-10 py-4 md:py-5 rounded-2xl text-white font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
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
              className="mt-8 bg-slate-900 border border-green-500 rounded-2xl p-5 md:p-7 shadow-[0_0_35px_rgba(34,197,94,0.15)]"
            >

              <h3 className="text-green-400 text-xl md:text-2xl font-bold mb-5">
                🔍 Security Analysis in Progress
              </h3>

              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-3">

                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />

              </div>

              <p className="text-green-400 font-semibold mb-6">
                {progress}% Completed
              </p>

              <div className="space-y-4">

  {[
    "Validating URL Format",
    "Performing WHOIS Lookup",
    "Checking SSL Certificate",
    "Fetching DNS Records",
    "Querying VirusTotal",
    "Google Safe Browsing Analysis",
    "AI Threat Prediction",
    "Generating Security Report",
  ].map((step, index) => (

    <motion.div
      key={index}
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: progress >= (index + 1) * 12 ? 1 : 0.4,
        x: progress >= (index + 1) * 12 ? 8 : 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
        progress >= (index + 1) * 12
          ? "bg-green-500/15 border border-green-500"
          : "bg-slate-800 border border-slate-700"
      }`}
    >

      <span className="text-white">
        {step}
      </span>

      <span className="text-green-400 font-bold">
        {progress >= (index + 1) * 12 ? "✓" : "..."}
      </span>

    </motion.div>

  ))}

</div>

              <div className="mt-8 flex justify-center">

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