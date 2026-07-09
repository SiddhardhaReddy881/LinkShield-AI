import { FaShieldAlt } from "react-icons/fa";

function RiskBadge({ score }) {
  let color = "bg-green-500";
  let text = "SAFE";

  if (score < 80 && score >= 50) {
    color = "bg-yellow-500";
    text = "SUSPICIOUS";
  }

  if (score < 50) {
    color = "bg-red-600";
    text = "MALICIOUS";
  }

  return (
    <div className="flex flex-col items-center gap-3">

      <div
        className={`${color} px-8 py-3 rounded-full flex items-center gap-3 shadow-lg`}
      >
        <FaShieldAlt className="text-2xl text-white" />

        <span className="text-xl font-bold text-white">
          {text}
        </span>
      </div>

      <p className="text-gray-400">
        Overall Threat Status
      </p>

    </div>
  );
}

export default RiskBadge;