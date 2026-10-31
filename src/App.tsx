import { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import Industries from "./components/Industries";
import ServiceAreas from "./components/ServiceAreas";
import FAQ from "./components/FAQ";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
    document.body.style.overflow = "hidden";
  };

  const closeForm = () => {
    setShowForm(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Navigation onGetQuote={openForm} />
      <main>
        <Hero onGetQuote={openForm} />
        <Products onGetQuote={openForm} />
        <HowItWorks onGetQuote={openForm} />
        <WhyUs />
        <Industries />
        <ServiceAreas onGetQuote={openForm} />
        <FAQ />
      </main>
      <Footer onGetQuote={openForm} />
      {showForm && <LeadForm onClose={closeForm} />}
    </>
  );
}
