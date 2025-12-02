import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";

// Lazy load لكل الـComponents
const HeroSection = lazy(() => import("../components/HeroSection"));
const Highlights = lazy(() => import("../components/Highlights"));
const AnimatedCards = lazy(() => import("../components/AnimatedCards"));
const Footer = lazy(() => import("../components/Footer"));
const PartnersSection = lazy(() => import("../components/PartnersSection"));
const PlatformOverview = lazy(() => import("../components/PlatformOverview"));

const Home = () => {
  return (
    <>
      {/* SEO + Meta */}
      <Helmet>
        <title>Home | Agent UI</title>
        <meta
          name="description"
          content="Agent UI homepage – أفضل تجربة لتصفح المنتجات والخدمات."
        />
        <link rel="canonical" href="https://agent-ui-beta-five.vercel.app/" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Home | Agent UI",
            "description": "Agent UI homepage – أفضل تجربة لتصفح المنتجات والخدمات."
          }
          `}
        </script>
      </Helmet>

      {/* Components */}
      <Suspense fallback={<div>Loading...</div>}>
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
          glowColor="132, 0, 255"
        />
        <AnimatedCards />
        <Highlights />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
