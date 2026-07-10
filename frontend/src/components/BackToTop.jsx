import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-black p-4 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:scale-110 transition-all duration-300"
    >
      <ChevronUp size={24} />
    </button>
  );
}

export default BackToTop;