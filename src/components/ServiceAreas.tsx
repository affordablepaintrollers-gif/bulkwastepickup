const states = [
  { name: "Alabama", abbr: "AL" }, { name: "Alaska", abbr: "AK" }, { name: "Arizona", abbr: "AZ" },
  { name: "Arkansas", abbr: "AR" }, { name: "California", abbr: "CA" }, { name: "Colorado", abbr: "CO" },
  { name: "Connecticut", abbr: "CT" }, { name: "Delaware", abbr: "DE" }, { name: "Florida", abbr: "FL" },
  { name: "Georgia", abbr: "GA" }, { name: "Hawaii", abbr: "HI" }, { name: "Idaho", abbr: "ID" },
  { name: "Illinois", abbr: "IL" }, { name: "Indiana", abbr: "IN" }, { name: "Iowa", abbr: "IA" },
  { name: "Kansas", abbr: "KS" }, { name: "Kentucky", abbr: "KY" }, { name: "Louisiana", abbr: "LA" },
  { name: "Maine", abbr: "ME" }, { name: "Maryland", abbr: "MD" }, { name: "Massachusetts", abbr: "MA" },
  { name: "Michigan", abbr: "MI" }, { name: "Minnesota", abbr: "MN" }, { name: "Mississippi", abbr: "MS" },
  { name: "Missouri", abbr: "MO" }, { name: "Montana", abbr: "MT" }, { name: "Nebraska", abbr: "NE" },
  { name: "Nevada", abbr: "NV" }, { name: "New Hampshire", abbr: "NH" }, { name: "New Jersey", abbr: "NJ" },
  { name: "New Mexico", abbr: "NM" }, { name: "New York", abbr: "NY" }, { name: "North Carolina", abbr: "NC" },
  { name: "North Dakota", abbr: "ND" }, { name: "Ohio", abbr: "OH" }, { name: "Oklahoma", abbr: "OK" },
  { name: "Oregon", abbr: "OR" }, { name: "Pennsylvania", abbr: "PA" }, { name: "Rhode Island", abbr: "RI" },
  { name: "South Carolina", abbr: "SC" }, { name: "South Dakota", abbr: "SD" }, { name: "Tennessee", abbr: "TN" },
  { name: "Texas", abbr: "TX" }, { name: "Utah", abbr: "UT" }, { name: "Vermont", abbr: "VT" },
  { name: "Virginia", abbr: "VA" }, { name: "Washington", abbr: "WA" }, { name: "West Virginia", abbr: "WV" },
  { name: "Wisconsin", abbr: "WI" }, { name: "Wyoming", abbr: "WY" },
];

const topMarkets = [
  { city: "Los Angeles, CA", keyword: "IBC tote buyers Los Angeles" },
  { city: "Houston, TX", keyword: "used drum pickup Houston" },
  { city: "Chicago, IL", keyword: "sell gaylord boxes Chicago" },
  { city: "Dallas, TX", keyword: "IBC tote removal Dallas" },
  { city: "Atlanta, GA", keyword: "container buyers Atlanta" },
  { city: "Philadelphia, PA", keyword: "sell used drums Philadelphia" },
  { city: "Phoenix, AZ", keyword: "IBC tote buyers Phoenix" },
  { city: "Detroit, MI", keyword: "used container pickup Detroit" },
  { city: "Columbus, OH", keyword: "sell IBC totes Columbus" },
  { city: "Indianapolis, IN", keyword: "drum removal Indianapolis" },
  { city: "Charlotte, NC", keyword: "IBC tote buyers Charlotte" },
  { city: "Nashville, TN", keyword: "sell used containers Nashville" },
];

interface ServiceAreasProps {
  onGetQuote: () => void;
}

export default function ServiceAreas({ onGetQuote }: ServiceAreasProps) {
  return (
    <section id="service-areas" className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#166534] text-[#4ade80] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            Service Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Used Container Pickup Across All 50 States
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We buy IBC totes, 55 gallon drums, gaylord boxes, and 5 gallon buckets
            from businesses in every state. Nationwide reach, local service.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-base font-black text-gray-300 mb-5 text-center uppercase tracking-wider">
            Major Markets We Serve
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {topMarkets.map((market) => (
              <button
                key={market.city}
                onClick={onGetQuote}
                className="group text-left bg-[#1f2937] hover:bg-[#166534] border border-[#374151] hover:border-[#16a34a] rounded-xl p-4 transition-all duration-200"
              >
                <p className="font-black text-white text-sm transition-colors">
                  {market.city}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-green-300 transition-colors mt-0.5 font-medium">
                  Container Pickup Available
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-black text-gray-300 mb-5 text-center uppercase tracking-wider">
            Bulk Pickup Available in Every State
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
            {states.map((state) => (
              <div
                key={state.abbr}
                className="bg-[#1f2937] border border-[#374151] rounded-lg px-2.5 py-2 text-center hover:bg-[#166534] hover:border-[#16a34a] group transition-all duration-200 cursor-default"
                title={`Sell used IBC totes and drums in ${state.name}`}
              >
                <span className="text-xs font-black text-white group-hover:text-[#4ade80] transition-colors block">
                  {state.abbr}
                </span>
                <span className="text-[10px] text-gray-500 group-hover:text-green-300 transition-colors leading-tight block truncate font-medium">
                  {state.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-5 text-sm font-medium">
            Don't see your city listed? We service all of the US. Contact us for a custom pickup quote.
          </p>
          <button
            onClick={onGetQuote}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white font-black px-8 py-3.5 rounded-xl transition-all active:scale-95"
          >
            Request Pickup in My Area
          </button>
        </div>
      </div>
    </section>
  );
}
