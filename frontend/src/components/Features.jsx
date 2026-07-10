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
      className="bg-slate-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4"
        >
          Platform Features
        </motion.h2>

        <p className="text-center text-slate-400 text-sm md:text-lg leading-7 max-w-3xl mx-auto mb-10 md:mb-14">
          LinkShield AI combines Artificial Intelligence, Threat Intelligence,
          WHOIS Analysis, SSL Verification and Real-Time URL Scanning to protect
          users from phishing attacks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">

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
                className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl hover:border-green-500 hover:shadow-[0_0_35px_rgba(34,197,94,0.25)] transition-all duration-300 cursor-pointer"
              >

                <Icon
                  size={42}
                  className="text-green-400 mb-5"
                />

                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm md:text-base leading-7">
                  {feature.description}
                </p>

                <div className="mt-6">

                  <span className="inline-block w-full sm:w-auto bg-green-500 hover:bg-green-600 hover:scale-105 text-center text-black font-semibold px-5 py-3 rounded-xl transition-all duration-300">
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