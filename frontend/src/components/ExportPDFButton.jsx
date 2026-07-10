import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { toast } from "react-hot-toast";

function ExportPDFButton({ data }) {
  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const downloadPDF = () => {
    if (!isLoggedIn()) {
      toast.error("Please login first.");
      return;
    }

    const pdf = new jsPDF();

    const date = new Date();

    pdf.setFontSize(22);
    pdf.setTextColor(0, 120, 0);
    pdf.text("LinkShield AI", 20, 20);

    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Security Analysis Report", 20, 30);

    pdf.setFontSize(11);

    pdf.text(
      `Generated On: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      20,
      40
    );

    pdf.line(20, 45, 190, 45);

    pdf.text(`URL: ${data.url}`, 20, 55);

    pdf.text(
      `Threat Score: ${data.threat_analysis?.overall_score ?? "N/A"}/100`,
      20,
      65
    );

    pdf.text(
      `Classification: ${data.threat_analysis?.classification ?? "Unknown"}`,
      20,
      75
    );

    pdf.text(
      `Confidence: ${data.threat_analysis?.confidence ?? "N/A"}`,
      20,
      85
    );

    pdf.text(
      `VirusTotal Clean Engines: ${data.virustotal?.harmless ?? 0}`,
      20,
      95
    );

    pdf.text(
      `Google Safe Browsing: ${
        data.google_safe_browsing?.safe ? "Safe" : "Unsafe"
      }`,
      20,
      105
    );

    pdf.text(
      `IP Address: ${data.ip_info?.ip ?? "Unknown"}`,
      20,
      115
    );

    pdf.text(
      `Country: ${data.ip_info?.country ?? "Unknown"}`,
      20,
      125
    );

    pdf.text(
      `Registrar: ${data.whois?.registrar ?? "Unknown"}`,
      20,
      135
    );

    pdf.text(
      `Domain Age: ${
        data.domain_age?.age_years
          ? `${data.domain_age.age_years} Years`
          : "Unknown"
      }`,
      20,
      145
    );

    pdf.setFontSize(14);
    pdf.text("Threat Summary", 20, 160);

    pdf.setFontSize(11);

    let y = 170;

    if (Array.isArray(data.threat_analysis?.summary)) {
      data.threat_analysis.summary.forEach((item) => {
        pdf.text(`• ${item}`, 25, y);
        y += 8;
      });
    } else {
      pdf.text("No summary available.", 25, y);
    }

    pdf.save("LinkShield_AI_Report.pdf");

    toast.success("PDF Exported Successfully");
  };

  return (
    <button
      onClick={downloadPDF}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white transition"
    >
      <Download size={18} />
      Export PDF
    </button>
  );
}

export default ExportPDFButton;