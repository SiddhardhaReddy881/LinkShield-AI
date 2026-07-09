import jsPDF from "jspdf";
import { Download } from "lucide-react";

function ExportPDFButton({ data }) {

  const downloadPDF = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("LinkShield AI Security Report", 20, 20);

    pdf.setFontSize(12);

    pdf.text(`URL: ${data.url}`, 20, 40);
    pdf.text(`Threat Score: ${data.threat_analysis.overall_score}/100`, 20, 50);
    pdf.text(`Classification: ${data.threat_analysis.classification}`, 20, 60);
    pdf.text(`Confidence: ${data.threat_analysis.confidence}`, 20, 70);

    pdf.text(
      `VirusTotal: ${data.virustotal.harmless} Engines Clean`,
      20,
      80
    );

    pdf.text(
      `Google Safe Browsing: ${
        data.google_safe_browsing.safe ? "Safe" : "Unsafe"
      }`,
      20,
      90
    );

    pdf.text(
      `IP Address: ${data.ip_info.ip}`,
      20,
      100
    );

    pdf.text(
      `Country: ${data.ip_info.country}`,
      20,
      110
    );

    pdf.text(
      `Registrar: ${data.whois.registrar}`,
      20,
      120
    );

    pdf.text(
      `Domain Age: ${
        data.domain_age?.age_years
          ? data.domain_age.age_years + " Years"
          : "Unknown"
      }`,
      20,
      130
    );

    pdf.text("Threat Summary:", 20, 145);

    let y = 155;

    data.threat_analysis.summary.forEach((item) => {
      pdf.text(`• ${item}`, 25, y);
      y += 10;
    });

    pdf.save("LinkShield_Report.pdf");
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