import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featers from "./components/Featers";
import DecreeSection from "./components/DecreeSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

function Landing() {
  return <div className="min-h-screen bg-base-100">
    <Navbar/>
    <Hero/>
    <Featers/>
    <DecreeSection/>
    <HowItWorks/>
    <Footer/>
  </div>;
}

export default Landing;
