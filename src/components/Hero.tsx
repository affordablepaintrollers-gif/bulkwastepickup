import { ArrowRight, CheckCircle, BadgeDollarSign } from "lucide-react";

interface HeroProps {
  onGetQuote: () => void;
}

export default function Hero({ onGetQuote }: HeroProps) {
  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dcfce7] rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f0fdf4] rounded-full opacity-50 blur-2xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2 rounded-full text-sm font-bold mb-8">
              <BadgeDollarSign className="w-4 h-4" />
              Free Pickup — Fast Payment — All 50 States
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#111827] leading-[1.05] tracking-tight mb-6">
              We Buy Your{" "}
              <span className="text-[#16a34a]">Used Industrial</span>{" "}
              Containers
            </h1>

            <p className="text-lg md:text-xl text-[#4b5563] mb-8 leading-relaxed max-w-lg">
              IBC totes, 55 gallon drums, gaylord boxes, and 5 gallon buckets.
              Free scheduled pickup at your facility. Turn surplus into cash today.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Free pickup at your facility — nationwide",
                "Clean, dirty, or blemished — we take all conditions",
                "Payment by check or ACH on pickup day",
                "Focused on commercial & large bulk pickups",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#374151]">
                  <CheckCircle className="w-5 h-5 text-[#16a34a] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <button
                onClick={onGetQuote}
                className="group inline-flex items-center gap-3 bg-[#166534] hover:bg-[#14532d] text-white font-black text-xl sm:text-2xl px-10 sm:px-12 py-6 sm:py-7 rounded-2xl transition-all duration-200 hover:shadow-2xl hover:shadow-green-900/25 active:scale-95 tracking-tight"
              >
                Schedule Free Pickup
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-sm text-[#6b7280]">
                <span className="font-semibold text-[#374151]">Responds in under 1 hour.</span>
                <br />No commitment required.
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <img
                src="/image copy.png"
                alt="Forklift moving commercial inventory through an industrial warehouse"
                className="w-full h-[480px] lg:h-[560px] object-cover"
                width="1120"
                height="1120"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10,000+", label: "Businesses Served" },
              { number: "All 50", label: "States Covered" },
              { number: "Same Day", label: "Quote Turnaround" },
              { number: "$0", label: "Pickup Cost to You" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-black text-[#4ade80]">{stat.number}</div>
                <div className="text-gray-400 text-sm mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
