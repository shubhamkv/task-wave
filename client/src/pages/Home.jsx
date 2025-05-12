import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/NewsLetter";

export const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-300 dark:from-gray-900 dark:via-gray-950 dark:to-black">
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
