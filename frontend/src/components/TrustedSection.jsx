import { Brain, Globe, ShieldCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

const technologies = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "AI model trained to detect phishing URLs."
  },
  {
    icon: ShieldCheck,
    title: "Google Safe Browsing",
    description: "Checks URLs against Google's threat database."
  },
  {
    icon: Globe,
    title: "WHOIS Lookup",
    description: "Analyzes domain ownership and registration details."
  },
  {
    icon: Database,
    title: "Threat Intelligence",
    description: "Combines multiple security sources for better detection."
  }
];

function TrustedSection() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-14"
        >
          Powered By Trusted Technologies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-950 border border-slate-700 rounded-2xl p-8 text-center"
              >
                <Icon
                  size={50}
                  className="mx-auto text-green-400 mb-5"
                />

                <h3 className="text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {tech.description}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default TrustedSection;