import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Features } from "../components/Features";
import { AppPreview } from "../components/AppPreview";
import { Testimonials } from "../components/Testimonials";
import { JoinUs } from "../components/JoinUs";
import { WhySection } from "../components/WhySection";
import { Footer } from "../components/Footer";

export function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      <Header />
      <main>
        <HeroSection />
        <Features />
        <AppPreview />
        <WhySection />
        <Testimonials />
        <JoinUs />
      </main>
      <Footer />
    </motion.div>
  );
}