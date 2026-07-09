import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";

function ThreatGauge({ score }) {
  const color =
    score >= 80
      ? "#22c55e"
      : score >= 50
      ? "#facc15"
      : "#ef4444";

  const status =
    score >= 80
      ? "SAFE"
      : score >= 50
      ? "SUSPICIOUS"
      : "MALICIOUS";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Threat Score
      </h2>

      <div className="w-64 h-64">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#1e293b",
            textColor: "#ffffff",
            textSize: "18px",
            strokeLinecap: "round",
            pathTransitionDuration: 1.5,
          })}
        />

      </div>

      <div
        className="mt-6 px-6 py-2 rounded-full text-white font-bold text-lg shadow-lg"
        style={{ backgroundColor: color }}
      >
        {status}
      </div>

      <p className="text-gray-400 mt-4 text-center">
        AI-generated threat confidence based on multiple security engines.
      </p>

    </motion.div>
  );
}

export default ThreatGauge;