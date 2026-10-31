import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

interface NavigationProps {
  onGetQuote: () => void;
}

export default function Navigation({ onGetQuote }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-gray-200"
          : "bg-white/98 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#166534] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M3 10h18M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" />
              </svg>
            </div>
            <div>
              <span className="text-[#111827] font-black text-lg leading-tight block tracking-tight">Bulk Waste</span>
              <span className="text-[#16a34a] text-xs font-bold leading-tight block">Pickup</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "What We Buy", id: "what-we-buy" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Industries", id: "industries" },
              { label: "Service Areas", id: "service-areas" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[#4b5563] hover:text-[#166534] text-sm font-semibold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+19203600485"
              className="flex items-center gap-2 text-[#374151] hover:text-[#166534] text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#16a34a]" />
              <span>(920) 360-0485</span>
            </a>
            <button
              onClick={onGetQuote}
              className="bg-[#166534] hover:bg-[#14532d] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-900/20 active:scale-95"
            >
              Get Free Quote
            </button>
          </div>

          <button
            className="md:hidden text-[#111827] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {[
              { label: "What We Buy", id: "what-we-buy" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Industries", id: "industries" },
              { label: "Service Areas", id: "service-areas" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left text-[#4b5563] hover:text-[#166534] py-2.5 text-sm font-semibold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <a href="tel:+19203600485" className="flex items-center gap-2 text-[#374151] text-sm font-semibold">
                <Phone className="w-4 h-4 text-[#16a34a]" />
                (920) 360-0485
              </a>
              <button
                onClick={() => { onGetQuote(); setMobileOpen(false); }}
                className="w-full bg-[#166534] hover:bg-[#14532d] text-white font-bold py-3 rounded-lg text-sm transition-colors"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
