import { motion } from "framer-motion";

function InfoCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      transition={{ duration: 0.25 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-5">

        <div className="text-4xl">
          {icon}
        </div>

        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">

          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

        </div>

      </div>

      <h3 className="text-slate-400 uppercase tracking-wider text-sm mb-2">
        {title}
      </h3>

      <p className="text-white text-xl font-bold break-all">
        {value || "N/A"}
      </p>

    </motion.div>
  );
}

export default InfoCard;