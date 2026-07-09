import { ShieldCheck, Globe, AlertTriangle, Brain } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: ShieldCheck,
    value: "50K+",
    title: "URLs Scanned",
  },
  {
    icon: AlertTriangle,
    value: "12K+",
    title: "Threats Blocked",
  },
  {
    icon: Globe,
    value: "100+",
    title: "Countries Protected",
  },
  {
    icon: Brain,
    value: "99.8%",
    title: "Detection Accuracy",
  },
];

function Statistics() {
  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center shadow-lg"
            >
              <Icon
                size={50}
                className="mx-auto text-green-400 mb-5"
              />

              <h2 className="text-4xl font-bold text-white">
                {item.value}
              </h2>

              <p className="text-slate-400 mt-3">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Statistics;