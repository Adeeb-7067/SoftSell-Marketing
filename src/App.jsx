import React from 'react';
import CompanyLogos from "./Components/CompanyLogos";
import ContactForm from "./Components/ContactForm";
import FAQ from "./Components/FAQ";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import MetricsShowcase from "./Components/MetricsShowCase";
import PricingCalculator from "./Components/PriceCalculator";
import Testimonials from "./Components/Testimonials";
import WhyChooseUs from "./Components/WhyChooseUs";
import ChatWidgetWithGemini from "./Components/ChatBot-LLM";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Remove duplicate Header component here */}
        <Hero />
        <HowItWorks />
        <PricingCalculator />
        <WhyChooseUs />
        <CompanyLogos />
        <MetricsShowcase />
        <Testimonials />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      
      {/* Chat Widget that appears on all pages */}
      <ChatWidgetWithGemini />
    </div>
  );
}

export default App;