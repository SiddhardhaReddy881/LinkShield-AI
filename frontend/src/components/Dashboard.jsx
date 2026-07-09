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
    <div className="mt-10 bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-10">
        🛡 LinkShield AI Dashboard
      </h1>

      {/* Security Score Bar */}
      <SecurityScoreBar score={score} />

      {/* Top Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <CopyURLButton url={data.url} />
        <ExportPDFButton data={data} />
      </div>

      {/* Threat Score */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">

        <ThreatGauge score={score} />

        <RiskBadge score={score} />

      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

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
          value={`${data.virustotal?.harmless} Engines Clean`}
        />

        <InfoCard
          icon="🛡️"
          title="Google Safe Browsing"
          value={
            data.google_safe_browsing?.safe
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
          value={data.ip_info?.ip}
        />

        <InfoCard
          icon="🌍"
          title="Country"
          value={data.ip_info?.country}
        />

        <InfoCard
          icon="🏢"
          title="Registrar"
          value={data.whois?.registrar}
        />

        <InfoCard
          icon="🔒"
          title="SSL Certificate"
          value={data.ssl?.ssl_valid ? "Valid" : "Invalid"}
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
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8">

        <h2 className="text-2xl font-bold text-white mb-5">
          🌍 Server Location
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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

        <div className="flex justify-center mt-8">
          <a
            href={`https://www.google.com/maps?q=${data.ip_info?.latitude},${data.ip_info?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
          >
            📍 Open in Google Maps
          </a>
        </div>

      </div>

      {/* AI Explanation */}
      <AIExplanation data={data} />

    </div>
  );
}

export default Dashboard;