import ThreatGauge from "./ThreatGauge";
import RiskBadge from "./RiskBadge";
import InfoCard from "./InfoCard";
import SummaryCard from "./SummaryCard";
import SecurityScoreBar from "./SecurityScoreBar";
import CopyURLButton from "./CopyURLButton";
import ExportPDFButton from "./ExportPDFButton";
import AIExplanation from "./AIExplanation";

function Dashboard({ data }) {
  if (!data) return null;

  const score = data.threat_analysis?.overall_score || 0;

  return (
    <div className="mt-10 bg-slate-900 border border-slate-700 rounded-3xl p-5 md:p-8 shadow-[0_0_50px_rgba(34,197,94,0.12)] overflow-hidden">

      {/* Dashboard Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold text-white text-center mb-8 md:mb-10">
        🛡 LinkShield AI Dashboard
      </h1>

      {/* Security Score */}
      <SecurityScoreBar score={score} />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-8">
        <CopyURLButton url={data.url} />
        <ExportPDFButton data={data} />
      </div>

      {/* Threat Gauge */}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 md:gap-10">

        <ThreatGauge score={score} />

        <RiskBadge score={score} />

      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

        <InfoCard
          icon="🛡"
          title="Threat Score"
          value={`${score}/100`}
        />

        <InfoCard
          icon="⚠️"
          title="Classification"
          value={data.threat_analysis?.classification}
        />

        <InfoCard
          icon="📊"
          title="Confidence"
          value={data.threat_analysis?.confidence}
        />

        <InfoCard
          icon="🦠"
          title="VirusTotal"
          value={
            data.virustotal?.error
              ? "Unavailable"
              : `${data.virustotal?.harmless ?? 0} Engines Clean`
          }
        />

        <InfoCard
          icon="🛡️"
          title="Google Safe Browsing"
          value={
            data.google_safe_browsing?.error
              ? "Unavailable"
              : data.google_safe_browsing?.safe
              ? "Safe"
              : "Unsafe"
          }
        />

        <InfoCard
          icon="📅"
          title="Domain Age"
          value={
            data.domain_age?.age_years
              ? `${data.domain_age.age_years} Years`
              : "Unknown"
          }
        />

        <InfoCard
          icon="🌐"
          title="IP Address"
          value={data.ip_info?.ip || "Unknown"}
        />

        <InfoCard
          icon="🌍"
          title="Country"
          value={data.ip_info?.country || "Unknown"}
        />

        <InfoCard
          icon="🏢"
          title="Registrar"
          value={data.whois?.registrar || "Unknown"}
        />

        <InfoCard
          icon="🔒"
          title="SSL Certificate"
          value={
            data.ssl?.error
              ? "Unavailable"
              : data.ssl?.ssl_valid
              ? "Valid"
              : "Invalid"
          }
        />

        <InfoCard
          icon="📡"
          title="DNS Server"
          value={data.dns?.A?.[0] || "Unknown"}
        />

      </div>

      {/* Threat Summary */}
      <SummaryCard
        summary={data.threat_analysis?.summary}
      />

      {/* Server Location */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-5 md:p-7 mt-10 shadow-lg">

        <h2 className="text-xl md:text-3xl font-bold text-white mb-6">
          🌍 Website Hosting Server
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

          <InfoCard
            icon="🌍"
            title="Country"
            value={data.ip_info?.country}
          />

          <InfoCard
            icon="🗺️"
            title="Region"
            value={data.ip_info?.region}
          />

          <InfoCard
            icon="🏙️"
            title="City"
            value={data.ip_info?.city}
          />

          <InfoCard
            icon="🌐"
            title="IP Address"
            value={data.ip_info?.ip}
          />

          <InfoCard
            icon="🏢"
            title="ISP"
            value={data.ip_info?.isp}
          />

          <InfoCard
            icon="🕒"
            title="Timezone"
            value={data.ip_info?.timezone}
          />

        </div>

        <div className="flex justify-center mt-8 px-2">

          <a
            href={`https://www.google.com/maps?q=${data.ip_info?.latitude},${data.ip_info?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 hover:scale-105 px-6 py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg"
          >
            📍 Open in Google Maps
          </a>

        </div>

        {/* Information Box */}

        <div className="mt-8 bg-blue-950 border border-blue-700 rounded-2xl p-5 md:p-6 shadow-lg">

          <h3 className="text-blue-300 text-lg md:text-xl font-bold mb-4">
            ℹ Website Hosting Server Information
          </h3>

          <p className="text-gray-300 text-sm md:text-base leading-7 md:leading-8">

            The information shown above represents the
            <span className="text-green-400 font-semibold">
              {" "}website's hosting server
            </span>,
            not your current location.

            <br /><br />

            Many popular websites such as
            <span className="text-green-400 font-semibold">
              {" "}Google, Microsoft, GitHub, Facebook, Amazon and Cloudflare
            </span>
            use multiple servers around the world through
            Content Delivery Networks (CDNs) and global load balancing.

            <br /><br />

            As a result, the server IP address, city, region and country may change
            between scans depending on which server responds to your request.

            <br /><br />

            ✅ This is normal behavior and does not indicate that the website is malicious.

          </p>

        </div>

      </div>

      {/* AI Explanation */}

      <AIExplanation data={data} />

    </div>
  );
}

export default Dashboard;