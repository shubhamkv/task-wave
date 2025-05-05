import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/NewsLetter";

export const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300">
        <Navbar />
        <HeroSection />
        <Features />
        <Testimonials />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};
