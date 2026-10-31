import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onGetQuote: () => void;
}

const stateLinks = [
  "California", "Texas", "Florida", "New York", "Ohio",
  "Illinois", "Pennsylvania", "Michigan", "Georgia", "North Carolina",
  "New Jersey", "Virginia", "Washington", "Arizona", "Tennessee",
  "Indiana", "Missouri", "Maryland", "Wisconsin", "Colorado",
];

export default function Footer({ onGetQuote }: FooterProps) {
  return (
    <footer className="bg-[#111827] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#166534] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M3 10h18M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" />
                </svg>
              </div>
              <div>
                <span className="text-white font-black text-lg leading-tight block tracking-tight">Bulk Waste Pickup</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm text-sm font-medium">
              Bulk Waste Pickup purchases used IBC totes, 55 gallon drums, gaylord boxes,
              and 5 gallon buckets directly from industrial businesses nationwide.
              Free pickup. Fast payment. All conditions accepted.
            </p>
            <div className="space-y-3">
              <a href="tel:+19203600485" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm font-semibold">
                <Phone className="w-4 h-4 text-[#4ade80]" />
                (920) 360-0485
              </a>
              <a href="mailto:contact@bulkwastepickup.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm font-semibold">
                <Mail className="w-4 h-4 text-[#4ade80]" />
                contact@bulkwastepickup.com
              </a>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <MapPin className="w-4 h-4 text-[#4ade80]" />
                Serving All 50 United States
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-xs mb-5 uppercase tracking-widest">What We Buy</h4>
            <ul className="space-y-2.5">
              {[
                { label: "IBC Totes (275 & 330 Gal)", id: "ibc-totes" },
                { label: "55 Gallon Drums", id: "55-gallon-drums" },
                { label: "Gaylord Boxes", id: "gaylord-boxes" },
                { label: "5 Gallon Buckets", id: "5-gallon-buckets" },
                { label: "Food Grade IBC Totes", id: "ibc-totes" },
                { label: "Steel Drums", id: "55-gallon-drums" },
                { label: "Plastic Drums (HDPE)", id: "55-gallon-drums" },
                { label: "Industrial Pails", id: "5-gallon-buckets" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs mb-5 uppercase tracking-widest">Top Service Areas</h4>
            <ul className="space-y-2">
              {stateLinks.map((state) => (
                <li key={state}>
                  <button
                    onClick={() => document.getElementById("service-areas")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    Container Pickup — {state}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1f2937] py-8">
          <div className="text-xs text-gray-600 leading-relaxed mb-5 font-medium">
            Sell used IBC totes &bull; IBC tote buyers near me &bull; 55 gallon drum pickup service &bull;
            sell used drums for cash &bull; gaylord box removal &bull; used container buyers &bull;
            industrial container disposal &bull; bucket removal service &bull; IBC tote removal California
            Texas Florida New York Ohio Illinois Pennsylvania Michigan Georgia North Carolina &bull;
            sell surplus IBC totes &bull; free IBC tote pickup
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 font-medium">
              &copy; {new Date().getFullYear()} Bulk Waste Pickup — All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={onGetQuote} className="text-xs text-[#4ade80] hover:text-white font-black transition-colors">
                Get a Free Quote
              </button>
              <span className="text-gray-700 text-xs">|</span>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-300 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-600 hover:text-gray-300 transition-colors font-medium">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
