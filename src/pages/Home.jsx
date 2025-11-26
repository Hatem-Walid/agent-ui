import React from "react";
import HeroSection from "../components/HeroSection";
import Highlights from "../components/Highlights";
import AnimatedCards from "../components/AnimatedCards";
import Footer from "../components/Footer";
import PartnersSection from "../components/PartnersSection";
import PlatformOverview from "../components/PlatformOverview";
const Home = () => {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <PlatformOverview
       textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={false}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={100}
      glowColor="132, 0, 255" />
      <AnimatedCards />
      <Highlights />
      <Footer />
    </>
  );
};

export default Home;
