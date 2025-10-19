import React from "react";
import HeroSection from "../components/HeroSection";
import Highlights from "../components/Highlights";
import SecurityTools from "../components/SecurityTools";
import Footer from "../components/Footer";
import PartnersSection from "../components/PartnersSection";


const Home = () => {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <Highlights />
      <SecurityTools />
      <Footer />
    </>
  );
};

export default Home;
