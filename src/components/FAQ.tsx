import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much do you pay for used IBC totes?",
    answer:
      "Prices for used IBC totes vary based on size (275 vs 330 gallon), condition, and prior contents. Food-grade totes and those in clean condition typically command higher prices. Submit your details using our quote form and we'll provide a specific offer within 1 business hour.",
  },
  {
    question: "Do you buy dirty or blemished IBC totes and drums?",
    answer:
      "Yes. We accept IBC totes, 55 gallon drums, gaylord boxes, and 5 gallon buckets in a wide range of conditions — including dirty, blemished, and those with residual product. You do not need to clean or repair containers before we pick them up.",
  },
  {
    question: "Is the pickup really free?",
    answer:
      "Yes. We provide completely free scheduled pickup at your facility. You pay nothing for logistics, transportation, or labor. We send our own trucks and crew to load and haul the containers away.",
  },
  {
    question: "What states do you service for container pickup?",
    answer:
      "We provide used container pickup services across all 50 US states — from California and Texas to New York, Florida, and everywhere in between. We serve businesses of all sizes from single-facility operations to multi-location industrial companies.",
  },
  {
    question: "How quickly will I get paid after pickup?",
    answer:
      "Payment is issued by check or ACH bank transfer on or shortly after the day of pickup. We do not make you wait weeks for payment. Our goal is fast, predictable payment every time.",
  },
  {
    question: "What is the minimum quantity of containers you will buy?",
    answer:
      "We are focused on commercial and large bulk industrial pickups. Whether you have a pallet of IBC totes or a full truckload of drums, we evaluate all submissions. The more you have, the better the economics. Submit your details and we will let you know if we can make an offer.",
  },
  {
    question: "What is a gaylord box?",
    answer:
      "A gaylord box is a large, single-use or reusable corrugated cardboard container designed to sit on a standard shipping pallet. They are commonly used in manufacturing and distribution to bulk-ship loose goods, granules, powders, or small parts. We buy used gaylord boxes in all sizes — single, double, and triple wall.",
  },
  {
    question: "Do you buy food-grade IBC totes?",
    answer:
      "Yes, food-grade IBC totes are among the most valuable containers we purchase. Totes used for food-safe materials like water, food ingredients, or FDA-compliant chemicals are in high demand for reconditioning and reuse. They often command premium pricing.",
  },
  {
    question: "Is it better to sell or scrap my used IBC totes?",
    answer:
      "In most cases, selling to a container buyer like Bulk Waste Pickup will yield significantly more money than scrapping for steel value alone. A reconditioned IBC tote is worth far more than its metal content. We recommend getting a quote from us before sending anything to scrap.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#f9fafb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#dcfce7] text-[#166534] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            Everything you need to know about selling your used industrial containers
            to Bulk Waste Pickup.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                openIndex === index
                  ? "border-[#166534]/40 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <h3 className="font-black text-[#111827] text-sm md:text-base leading-snug">
                  {faq.question}
                </h3>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === index ? "bg-[#166534]" : "bg-gray-100"
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180 text-white" : "text-gray-500"
                    }`}
                  />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <p className="text-[#4b5563] leading-relaxed text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
