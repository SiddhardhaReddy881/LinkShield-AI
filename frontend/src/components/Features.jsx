import {
  ShieldCheck,
  Search,
  Globe,
  Lock,
  Brain,
  FileSearch,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Phishing Detection",
    description: "Detect phishing websites using intelligent URL analysis.",
    link: "#scanner",
  },
  {
    icon: Search,
    title: "Real-Time Scanning",
    description: "Analyze suspicious URLs instantly.",
    link: "#scanner",
  },
  {
    icon: Globe,
    title: "WHOIS Analysis",
    description: "Retrieve domain registration and ownership information.",
    link: "#analytics",
  },
  {
    icon: Lock,
    title: "SSL Verification",
    description: "Check whether websites use secure HTTPS certificates.",
    link: "#analytics",
  },
  {
    icon: Brain,
    title: "AI Prediction",
    description: "Machine learning predicts malicious URLs with high accuracy.",
    link: "#scanner",
  },
  {
    icon: FileSearch,
    title: "Threat Intelligence",
    description: "Cross-check URLs with multiple security intelligence sources.",
    link: "#history",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center text-white mb-4"
        >
          Platform Features
        </motion.h2>

        <p className="text-center text-slate-400 max-w-3xl mx-auto mb-14">
          LinkShield AI combines Artificial Intelligence, Threat Intelligence,
          WHOIS Analysis, SSL Verification and Real-Time URL Scanning to protect
          users from phishing attacks. Click any feature to explore the related
          section.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.a
                key={index}
                href={feature.link}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-lg hover:border-green-500 hover:shadow-green-500/20 transition-all duration-300 cursor-pointer"
              >

                <Icon
                  size={50}
                  className="text-green-400 mb-6"
                />

                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {feature.description}
                </p>

                <div className="mt-8">

                  <span className="inline-block bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition">
                    Explore →
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

export default Features;