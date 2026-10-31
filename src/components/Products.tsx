import { ArrowRight } from "lucide-react";

interface ProductsProps {
  onGetQuote: () => void;
}

const products = [
  {
    id: "ibc-totes",
    title: "IBC Totes",
    subtitle: "Intermediate Bulk Containers",
    description:
      "We buy 275 and 330 gallon IBC totes — food grade, chemical, clean, dirty, or blemished. Commercial and bulk quantities.",
    specs: ["275 Gallon Totes", "330 Gallon Totes", "Food Grade IBC Totes", "Chemical-Grade Totes", "Blemished / Dirty Accepted"],
    image: "https://images.pexels.com/photos/2786527/pexels-photo-2786527.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: "Most Requested",
  },
  {
    id: "55-gallon-drums",
    title: "55 Gallon Drums",
    subtitle: "Steel & Plastic Drums",
    description:
      "Sell your used 55 gallon drums — open head, tight head, steel, HDPE plastic, fiber. Commercial and bulk quantities.",
    specs: ["Steel Drums (Open & Tight Head)", "HDPE Plastic Drums", "Fiber / Cardboard Drums", "UN-Certified Drums", "Reconditioned Drums"],
    image: "https://images.pexels.com/photos/615670/pexels-photo-615670.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: null,
  },
  {
    id: "gaylord-boxes",
    title: "Gaylord Boxes",
    subtitle: "Bulk Corrugated Containers",
    description:
      "We purchase used gaylord boxes and bulk corrugated containers in all sizes and grades — triple wall, double wall, with or without liners.",
    specs: ["Triple Wall Gaylords", "Double Wall Gaylords", "Octagonal Bins", "Pallet-Based Containers", "All Sizes & Grades"],
    image: "https://images.pexels.com/photos/10834810/pexels-photo-10834810.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: null,
  },
  {
    id: "5-gallon-buckets",
    title: "5 Gallon Buckets",
    subtitle: "HDPE Industrial Pails",
    description:
      "Turn surplus 5 gallon buckets into cash. We buy plastic pails by the pallet or truckload from manufacturers, processors, and distributors.",
    specs: ["HDPE Plastic Buckets", "Metal / Steel Pails", "With or Without Lids", "UN-Rated Pails", "Bulk Quantities"],
    image: "https://images.pexels.com/photos/7513430/pexels-photo-7513430.jpeg?auto=compress&cs=tinysrgb&w=800",
    badge: null,
  },
];

export default function Products({ onGetQuote }: ProductsProps) {
  return (
    <section id="what-we-buy" className="py-24 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#dcfce7] text-[#166534] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            What We Buy
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-4">
            We Buy All Major Industrial Containers
          </h2>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            Clean, dirty, or blemished — we take them all. Get cash for containers
            your business no longer needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              id={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#166534]/40 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={`Used ${product.title} for sale — ${product.subtitle}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="800"
                  height="416"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-[#111827]/20 to-transparent" />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#16a34a] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-black text-2xl leading-tight">{product.title}</h3>
                  <p className="text-white/70 text-sm font-medium">{product.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-[#4b5563] mb-5 leading-relaxed text-sm">{product.description}</p>
                <ul className="space-y-1.5 mb-6">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-[#374151] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onGetQuote}
                  className="inline-flex items-center gap-2 text-[#166534] font-bold text-sm hover:gap-3 transition-all border-b-2 border-[#166534]/20 hover:border-[#166534] pb-0.5"
                >
                  Get a quote for your {product.title}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 bg-[#111827] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-white mb-1">
              Have something not listed? We still want to hear from you.
            </h3>
            <p className="text-gray-400 text-sm font-medium">
              We evaluate all types of industrial containers and packaging. Submit your
              details and we'll let you know if we can make an offer.
            </p>
          </div>
          <button
            onClick={onGetQuote}
            className="flex-shrink-0 bg-[#16a34a] hover:bg-[#15803d] text-white font-black px-7 py-3.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
          >
            Submit Your Details
          </button>
        </div>
      </div>
    </section>
  );
}
