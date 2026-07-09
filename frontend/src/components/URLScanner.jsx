import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import API from "../services/api";
import Dashboard from "./Dashboard";

function URLScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {

    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post("/scan", {
        url,
      });

      setResult(response.data);

      toast.success("Scan Completed Successfully");

    } catch (error) {

      console.error(error);

      toast.error("Unable to scan URL");

    } finally {

      setLoading(false);

    }

  };

  return (
    <section className="bg-slate-950 py-16 px-6">

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
            Detect phishing, malicious and suspicious URLs using AI &
            Threat Intelligence.
          </p>

          <div className="flex flex-col md:flex-row gap-5">

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-6 py-5 text-white outline-none text-lg"
            />

            <button
              disabled={loading}
              onClick={handleScan}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-700 px-10 rounded-xl text-white font-bold flex items-center justify-center gap-3 transition"
            >

              {loading ? (

                <>
                  <ClipLoader
                    size={20}
                    color="white"
                  />

                  Scanning...
                </>

              ) : (

                <>
                  <Search size={22} />

                  Scan URL
                </>

              )}

            </button>

          </div>

        </div>

        {result && (
          <Dashboard
            data={result}
          />
        )}

      </motion.div>

    </section>
  );
}

export default URLScanner;