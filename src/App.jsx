import CompanyLogos from "./Components/CompanyLogos";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
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
    <Testimonials />
    <ContactForm />
    <Footer  />
    </div>
  )
}