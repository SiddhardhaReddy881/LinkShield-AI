import { motion } from "framer-motion";

function SecurityScoreBar({ score }) {
  return (
    <div className="mb-8">

      <div className="flex justify-between mb-2">
        <span className="text-white font-semibold">
          Overall Security Score
        </span>

        <span className="text-green-400 font-bold">
          {score}%
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
          className={`h-4 rounded-full ${
            score >= 80
              ? "bg-green-500"
              : score >= 50
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        />

      </div>

    </div>
  );
}

export default SecurityScoreBar;