import { Truck, ShieldCheck, Clock, ThumbsUp, Recycle, HeartHandshake } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Pickup — No Cost to You",
    description:
      "We send our own trucks to your facility. You pay nothing for logistics. Zero cost container removal is our standard offering on every transaction.",
  },
  {
    icon: ShieldCheck,
    title: "We Accept All Conditions",
    description:
      "Dirty, blemished, residual product inside — we've seen it all. Don't spend time or money cleaning containers before we arrive. We take them as-is.",
  },
  {
    icon: Clock,
    title: "Fast, Reliable Payment",
    description:
      "No waiting months for a check. We issue payment by check or ACH bank transfer shortly after pickup. Predictable. Reliable. Every time.",
  },
  {
    icon: ThumbsUp,
    title: "Nationwide Coverage",
    description:
      "From California to Maine, we serve businesses in all 50 states. One contact, nationwide service — no need to find multiple regional buyers.",
  },
  {
    icon: Recycle,
    title: "Environmentally Responsible",
    description:
      "Containers we buy are reconditioned and reused — keeping them out of landfills. Partner with us and demonstrate your company's commitment to sustainability.",
  },
  {
    icon: HeartHandshake,
    title: "Commercial & Bulk Pickup Specialists",
    description:
      "We focus on commercial and large bulk industrial pickups. We understand volume, scheduling, compliance requirements, and facility logistics for businesses moving serious quantities.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#dcfce7] text-[#166534] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-4">
            Why Businesses Choose Bulk Waste Pickup
          </h2>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            We've built our business around one goal: making it as easy as possible
            for industrial companies to turn surplus containers into cash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-7 rounded-2xl border border-gray-200 hover:border-[#166534]/40 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] group-hover:bg-[#166534] flex items-center justify-center mb-5 transition-colors duration-300">
                <benefit.icon className="w-5 h-5 text-[#166534] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-black text-[#111827] mb-2.5">{benefit.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl overflow-hidden">
          <div className="bg-[#166534] px-8 md:px-12 py-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to Clear Your Facility and Get Paid?
              </h3>
              <p className="text-green-200 font-medium">
                Join thousands of businesses that have turned their surplus containers into revenue.
              </p>
            </div>
            <a
              href="tel:+19203600485"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-black px-6 py-3.5 rounded-xl transition-all whitespace-nowrap"
            >
              Call (920) 360-0485
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
