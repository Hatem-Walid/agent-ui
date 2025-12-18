import { lazy, Suspense } from "react";

// Lazy load لكل الـComponents
const HeroSection = lazy(() => import("../components/HeroSection"));
const Highlights = lazy(() => import("../components/Highlights"));
const AnimatedCards = lazy(() => import("../components/AnimatedCards"));
const Footer = lazy(() => import("../components/Footer"));
const PartnersSection = lazy(() => import("../components/PartnersSection"));
// const PlatformOverview = lazy(() => import("../components/PlatformOverview"));
const AIWorkflow = lazy(() => import("../components/AIWorkflow"));

const Home = () => {
  return (
    <>
      {/* Components */}
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
        <PartnersSection />
        <section style={{ background: 'transparent' }}>
          <AIWorkflow />
        </section>
        {/* <PlatformOverview
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={100}
          glowColor="132, 0, 255"
        /> */}
        <AnimatedCards />
        <Highlights />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
