import { motion } from "framer-motion";

function AIExplanation({ data }) {
  if (!data) return null;

  const reasons = [];

  // VirusTotal
  if (data.virustotal?.malicious === 0) {
    reasons.push("✔ VirusTotal detected no malicious engines.");
  } else {
    reasons.push("⚠ VirusTotal reported malicious detections.");
  }

  // Google Safe Browsing
  if (data.google_safe_browsing?.safe) {
    reasons.push("✔ Google Safe Browsing considers this URL safe.");
  } else {
    reasons.push("⚠ Google Safe Browsing flagged this URL.");
  }

  // SSL
  if (data.ssl?.ssl_valid) {
    reasons.push("✔ A valid SSL certificate is present.");
  } else {
    reasons.push("⚠ SSL certificate is missing or invalid.");
  }

  // Domain Age
  if (data.domain_age?.age_years) {
    reasons.push(
      `✔ Domain has existed for approximately ${data.domain_age.age_years} years.`
    );
  } else {
    reasons.push("ℹ Domain age could not be determined.");
  }

  // HTTP Security
  if (data.http_security?.security_score >= 80) {
    reasons.push("✔ Strong HTTP security headers are configured.");
  } else {
    reasons.push("⚠ Weak or missing HTTP security headers.");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        🤖 AI Security Explanation
      </h2>

      <p className="text-gray-300 mb-4">
        Based on the collected security indicators, this URL appears to be:
        <span className="text-green-400 font-bold">
          {" "}
          {data.threat_analysis?.classification}
        </span>
      </p>

      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {reasons.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default AIExplanation;