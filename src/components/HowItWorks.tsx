import { ClipboardList, Calendar, DollarSign } from "lucide-react";

interface HowItWorksProps {
  onGetQuote: () => void;
}

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Request a Free Quote",
    description:
      "Fill out our simple form in under 60 seconds. Tell us what containers you have, the quantity, condition, and location. Attach photos for an accurate quote.",
    detail: "No obligation. No spam. Just a fast, fair offer.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Schedule Your Free Pickup",
    description:
      "Once you accept our offer, we schedule a free pickup at your facility at a time that works for your operation — no disruptions to your workflow.",
    detail: "We come to you. You don't lift a finger.",
  },
  {
    number: "03",
    icon: DollarSign,
    title: "Get Paid Fast",
    description:
      "Payment is issued by check or ACH bank transfer immediately upon or shortly after pickup. No waiting weeks for a check that never shows up.",
    detail: "Check or ACH transfer. Your choice.",
  },
];

export default function HowItWorks({ onGetQuote }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#166534] text-[#4ade80] font-bold text-sm px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Selling Your Containers Is Simple
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From quote to cash in 3 easy steps. We handle all the logistics so your
            team can focus on what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-6 z-10">
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#166534] to-[#166534]/30" />
                </div>
              )}
              <div className="bg-[#1f2937] rounded-2xl p-8 border border-[#374151] hover:border-[#166534]/60 transition-all duration-300 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#166534] flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-[#4ade80]" />
                  </div>
                  <span className="text-5xl font-black text-[#374151] select-none leading-none pt-1">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm">{step.description}</p>
                <p className="text-sm font-bold text-[#4ade80]">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onGetQuote}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white font-black px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-green-900/30 active:scale-95"
          >
Start Step 1 — Schedule Free Pickup
          </button>
          <p className="text-gray-500 text-sm mt-3 font-medium">
            Responds within 1 business hour during business days.
          </p>
        </div>
      </div>
    </section>
  );
}
