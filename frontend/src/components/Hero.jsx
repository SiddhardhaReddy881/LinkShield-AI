import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

function Hero() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-green-500/20 blur-[120px] rounded-full -top-24 -left-24"></div>

      <div className="absolute w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-6 py-24">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >

          <ShieldCheck
            className="mx-auto text-green-400 mb-8"
            size={80}
          />

          <h1 className="text-6xl font-extrabold leading-tight">

            AI Powered

            <span className="text-green-400">

              {" "}Phishing Detection

            </span>

          </h1>

          <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto leading-9">

            Detect malicious websites before clicking.

            Protect yourself using Machine Learning,

            Threat Intelligence and Real-Time Analysis.

          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;