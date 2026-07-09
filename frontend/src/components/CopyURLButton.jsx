import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyURLButton({ url }) {
  const [copied, setCopied] = useState(false);

  const copyURL = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copyURL}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}

      {copied ? "Copied!" : "Copy URL"}
    </button>
  );
}

export default CopyURLButton;