import { Factory, Droplets, Wheat, Pill, Package, Cog } from "lucide-react";

const industries = [
  {
    icon: Factory,
    title: "Chemical & Industrial Processing",
    description:
      "Chemical plants, refineries, and industrial processors regularly cycle through IBC totes and steel drums. We provide compliant, documented container removal.",
    containers: ["IBC Totes", "55 Gallon Drums", "5 Gallon Buckets"],
  },
  {
    icon: Droplets,
    title: "Food & Beverage Manufacturing",
    description:
      "Food manufacturers rely on us to purchase food-grade IBC totes, HDPE buckets, and gaylord boxes. We understand FDA container handling requirements.",
    containers: ["Food Grade IBC Totes", "5 Gallon HDPE Pails", "Gaylord Boxes"],
  },
  {
    icon: Wheat,
    title: "Agriculture & Farming",
    description:
      "Farms and agricultural operations accumulate containers from fertilizers, pesticides, and feed supplements. We buy them in bulk, often direct from the field.",
    containers: ["IBC Totes", "55 Gallon Drums", "5 Gallon Buckets"],
  },
  {
    icon: Pill,
    title: "Pharmaceutical & Life Sciences",
    description:
      "Pharma and biotech companies dispose of specialty containers regularly. We handle chain-of-custody documentation and ensure compliant container removal.",
    containers: ["IBC Totes", "HDPE Drums", "Specialty Pails"],
  },
  {
    icon: Package,
    title: "Distribution & 3PL Logistics",
    description:
      "Warehouses and third-party logistics providers accumulate gaylord boxes and plastic containers at scale. We offer flexible pickup scheduling to match your freight cycles.",
    containers: ["Gaylord Boxes", "IBC Totes", "5 Gallon Buckets"],
  },
  {
    icon: Cog,
    title: "Automotive & Manufacturing",
    description:
      "Auto manufacturers and tier suppliers use drums and totes for lubricants, coolants, and coatings. We buy them after every production cycle.",
    containers: ["55 Gallon Drums", "IBC Totes", "Steel Pails"],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#dcfce7] text-[#166534] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            Industries We Serve
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-4">
            We Buy Containers From Every Industry
          </h2>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            Any industry that handles bulk liquids, chemicals, or materials at scale
            relies on the containers we buy. If your business uses them, we want them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-gray-200 hover:border-[#166534]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center mb-5">
                <industry.icon className="w-5 h-5 text-[#166534]" />
              </div>
              <h3 className="text-base font-black text-[#111827] mb-2.5">{industry.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-5">
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {industry.containers.map((c) => (
                  <span
                    key={c}
                    className="bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] text-xs font-bold px-2.5 py-1 rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
