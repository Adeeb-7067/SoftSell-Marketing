import CompanyLogos from "./Components/CompanyLogos";
import ContactForm from "./Components/ContactForm";
import FAQ from "./Components/FAQ";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import MetricsShowcase from "./Components/MetricsShowCase";
import Testimonials from "./Components/Testimonials";
import WhyChooseUs from "./Components/WhyChooseUs";

export default function App() {
  return (
    <div>
    <Header />
    <Hero />
    <HowItWorks />
    <WhyChooseUs />
    <CompanyLogos />
    <MetricsShowcase />
    <Testimonials />
    <ContactForm />
    <FAQ />
    <Footer  />
    </div>
  )
}