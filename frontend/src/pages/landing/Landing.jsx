import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featers from "./components/Featers";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

function Landing() {
  return <div className="min-h-screen bg-base-100">
    <Navbar/>
    <Hero/>
    <Featers/>
    <HowItWorks/>
    <Footer/>
  </div>;
}

export default Landing;
