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
  },
  {
    icon: Search,
    title: "Real-Time Scanning",
    description: "Analyze suspicious URLs instantly.",
  },
  {
    icon: Globe,
    title: "WHOIS Analysis",
    description: "Retrieve domain registration and ownership information.",
  },
  {
    icon: Lock,
    title: "SSL Verification",
    description: "Check whether websites use secure HTTPS certificates.",
  },
  {
    icon: Brain,
    title: "AI Prediction",
    description: "Machine learning predicts malicious URLs with high accuracy.",
  },
  {
    icon: FileSearch,
    title: "Threat Intelligence",
    description: "Cross-check URLs with multiple security intelligence sources.",
  },
];

function Features() {
  return (
    <section
  id="features"
  className="bg-slate-950 py-20 px-6"
>
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white mb-14">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-8"
              >

                <Icon
                  size={50}
                  className="text-green-400 mb-6"
                />

                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;