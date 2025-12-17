import { useLayoutEffect, useRef, Suspense, lazy, memo } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";


// Lazy load LiquidEther
const LiquidEther = lazy(() => import("./DarkVeil"));

function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Badge
      gsap.set(".badge", { autoAlpha: 0, y: 20 });
      gsap.to(".badge", { autoAlpha: 1, y: 0, duration: 1, delay: 0.3 });

      // Title
      gsap.set(".hero-title", { autoAlpha: 0, y: 25 });
      gsap.to(".hero-title", { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.6 });

      // Description
      gsap.set(".hero-desc", { autoAlpha: 0, y: 25 });
      gsap.to(".hero-desc", { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.9 });

      // Buttons
      gsap.set(["#get-started", "#learn-more"], { autoAlpha: 0, y: 20 });
      gsap.to(["#get-started", "#learn-more"], { autoAlpha: 1, y: 0, duration: 1, delay: 1.2, stagger: 0.2 });

      // Info
      gsap.set(".hero-info", { autoAlpha: 0 });
      gsap.to(".hero-info", { autoAlpha: 1, duration: 1, delay: 1.6 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-visible px-6 lg:px-8 bg-transparent"
    >
      {/* Liquid Ether Background */}
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-black"></div>}>
        <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
          <LiquidEther className="w-full h-full" />
        </div>
      </Suspense>

      <div className="absolute inset-0 -z-20 bg-black"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl px-4 w-full flex flex-col items-center">
        {/* Badge + logo
        <div className="badge inline-flex items-center gap-2 bg-purple-100/15 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 cursor-default">
         <img 
              src="\assets\icon 1.svg"
              alt="Logo"
              className="h-7 w-auto"
            />
          VulnSneak
        </div> */}

        {/* Main Heading */}
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-1 block text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 leading-snug md:leading-normal">
          Improve Your Security with AI
        </h1>

        {/* Description */}
        <p className="hero-desc text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto px-4">
          You're always ready to run with a full suite that helps security teams
          and developers secure applications from the first line of code to cloud deployment.
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-6 text-center relative z-50">
          <button
            id="get-started"
            onClick={() => navigate("/ai")}
            className="relative px-9 py-2 rounded-full font-semibold text-white text-base md:text-lg
              backdrop-blur-2xl bg-purple-500/20 border border-purple-300/20
              hover:bg-purple-500/30 transition-all duration-300 
              shadow-[0_0_20px_rgba(168,85,247,0.25)]
              hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
              hover:scale-105 active:scale-95"
          >
            Get Started
          </button>

          <button
            id="learn-more"
            onClick={() => navigate("/blog")}
            className="relative px-9 py-2 rounded-full font-semibold text-white text-base md:text-lg
              backdrop-blur-2xl bg-white/10 border border-white/20
              hover:bg-white/20 transition-all duration-300 
              shadow-[0_0_15px_rgba(255,255,255,0.15)]
              hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
              hover:scale-105 active:scale-95"
          >
            Learn More
          </button>
        </div>

        {/* Info */}
        <div className="hero-info mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Coverd 8 vernable security bugs
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Enterprise-grade security
          </div>
        </div>
      </div>
    </section>
  );
}

// Memoize the component
export default memo(Hero);
