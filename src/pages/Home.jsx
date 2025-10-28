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
      <PlatformOverview />
      <AnimatedCards />
      <Highlights />
      <Footer />
    </>
  );
};

export default Home;
