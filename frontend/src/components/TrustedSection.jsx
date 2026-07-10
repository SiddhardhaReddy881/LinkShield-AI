import { Brain, Globe, ShieldCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

const technologies = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "AI model trained to detect phishing URLs.",
    link: "https://www.tensorflow.org/",
  },
  {
    icon: ShieldCheck,
    title: "Google Safe Browsing",
    description: "Checks URLs against Google's threat database.",
    link: "https://safebrowsing.google.com/",
  },
  {
    icon: Globe,
    title: "WHOIS Lookup",
    description: "Analyzes domain ownership and registration details.",
    link: "https://lookup.icann.org/",
  },
  {
    icon: Database,
    title: "Threat Intelligence",
    description: "Combines multiple security sources for better detection.",
    link: "https://www.virustotal.com/",
  },
];

function TrustedSection() {
  return (
    <section
      id="trusted"
      className="bg-slate-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4"
        >
          Powered By Trusted Technologies
        </motion.h2>

        <p className="text-center text-slate-400 text-sm md:text-lg leading-7 max-w-3xl mx-auto mb-10 md:mb-14">
          LinkShield AI integrates multiple trusted cybersecurity technologies
          to provide accurate phishing detection and comprehensive URL analysis.
          Click any technology below to learn more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.a
                key={index}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-950 border border-slate-700 rounded-3xl p-6 md:p-8 text-center shadow-xl hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] hover:-translate-y-2 transition-all duration-300"
              >
                <Icon
                  size={42}
                  className="mx-auto text-green-400 mb-5"
                />

                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>

                <p className="text-slate-400 text-sm md:text-base leading-7">
                  {tech.description}
                </p>

                <div className="mt-6">
                  <span className="inline-block w-full sm:w-auto bg-green-500 hover:bg-green-600 hover:scale-105 text-black font-semibold px-5 py-3 rounded-xl transition-all duration-300">
                    Learn More →
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustedSection;