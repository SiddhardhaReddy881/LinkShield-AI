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
      className="bg-slate-900 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center text-white mb-4"
        >
          Powered By Trusted Technologies
        </motion.h2>

        <p className="text-center text-slate-400 mb-14 max-w-3xl mx-auto">
          LinkShield AI integrates multiple trusted cybersecurity technologies
          to provide accurate phishing detection and comprehensive URL analysis.
          Click any technology below to learn more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {technologies.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <motion.a
                key={index}
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="bg-slate-950 border border-slate-700 rounded-2xl p-8 text-center shadow-lg hover:border-green-500 hover:shadow-green-500/20 transition-all duration-300 cursor-pointer"
              >

                <Icon
                  size={50}
                  className="mx-auto text-green-400 mb-5"
                />

                <h3 className="text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>

                <p className="text-slate-400 text-sm leading-7">
                  {tech.description}
                </p>

                <div className="mt-6">

                  <span className="inline-block bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition">
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