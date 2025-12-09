import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 6000;

const testimonials = [
  {
    id: 1,
    name: "Matthew Hurewitz",
    role: "VP, AppSec",
    company: "Best Buy",
    quote:
      "CyberAgentX gave us continuous visibility across our CI/CD pipelines — the AI findings are actionable and have accelerated our triage time.",
  },
  {
    id: 2,
    name: "Amira Soliman",
    role: "Head of DevSecOps",
    company: "Netflix",
    quote:
      "Integration was seamless and the agent footprint is tiny. We now scan PRs earlier and ship with more confidence.",
  },
  {
    id: 3,
    name: "Ravi Patel",
    role: "SRE Lead",
    company: "Amazon",
    quote:
      "Real-time scanning and cloud posture checks reduced incidents in production significantly — great tooling for distributed teams.",
  },
  {
    id: 4,
    name: "Sofia Garcia",
    role: "Security Architect",
    company: "Google",
    quote:
      "The AI-driven detection removed noise and highlighted important changes. Our security reviews are now faster and more focused.",
  },
  {
    id: 5,
    name: "Liam O'Connor",
    role: "Chief Information Security Officer",
    company: "IBM",
    quote:
      "Enterprise features, SSO integration and policy enforcement made rollout across our org painless.",
  },
  {
    id: 6,
    name: "Hana Kim",
    role: "Platform Engineer",
    company: "Microsoft",
    quote:
      "The dashboards and reporting give exec-level clarity plus deep developer insights — a rare combination.",
  },
  {
    id: 7,
    name: "Diego Alvarez",
    role: "CTO",
    company: "Meta",
    quote:
      "Automated scans integrated into our CI reduced manual QA time and caught tricky dependency issues before release.",
  },
  {
    id: 8,
    name: "Noor Abdullah",
    role: "Security Ops",
    company: "Cloudflare",
    quote:
      "The platform scales well and the alerting integrates with our incident workflows — overall huge ROI.",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [isTouching, setIsTouching] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => setIsInView(ent.isIntersecting));
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !isTouching) startAutoplay();
    else stopAutoplay();
  }, [isInView, isTouching]);

  // Scroll event for desktop only - FIXED VERSION
  useEffect(() => {
    const handleWheel = (e) => {
      // Check if it's desktop (window width > 768px) and section is in view
      if (window.innerWidth > 768 && isInView) {
        const now = Date.now();
        
        // Prevent too rapid scrolling (debounce)
        if (now - lastScrollTime < 800) return;
        
        setLastScrollTime(now);
        
        if (e.deltaY > 20) {
          // Scroll down - next testimonial
          handleNext();
        } else if (e.deltaY < -20) {
          // Scroll up - previous testimonial
          handlePrev();
        }
        // Don't prevent default to allow normal scrolling on page
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isInView, lastScrollTime]);

  // Alternative: استخدام Keyboard arrows للتنقل
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (window.innerWidth > 768 && isInView) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInView]);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((p) => (p + 1) % testimonials.length);
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function handlePrev() {
    setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  }

  function handleNext() {
    setIndex((p) => (p + 1) % testimonials.length);
    startAutoplay();
  }

  // Swipe functions for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsTouching(true);
    stopAutoplay();
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    setIsTouching(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    setTimeout(() => startAutoplay(), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden min-h-[90vh] flex items-center"
      aria-label="Testimonials"
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(190deg, #1b0033 0%, #060025 100%)",

          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-8xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-purple-300 mb-4">
              What Our Customers Say
            </h3>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Trusted by Security & Engineering Teams Worldwide
            </h2>
            <p className="text-gray-300 mb-6">
              Real stories from teams using CyberAgentX to secure their entire lifecycle.
            </p>

            {/* Controls + Progress */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95 active:bg-white/30 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronLeft size={18} color="white" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95 active:bg-white/30 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronRight size={18} color="white" />
              </button>

              <div className="flex-1 ml-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: `${((index + 1) / testimonials.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeIn" }}
                    className="h-2 bg-gradient-to-r to-purple-500 from-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Scroll & Keyboard Indicators for Desktop */}
            <div className="hidden md:block mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Scroll to navigate
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Use arrow keys ← → ↑ ↓
              </div>
            </div>
          </div>

          {/* RIGHT - Mobile Touch Area */}
          <div 
            className="flex justify-center md:justify-end relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-xl relative"
              >
                <div className={`backdrop-blur-sm bg-gradient-to-r from-white/5 to-white/2 border border-white/1 rounded-4xl p-10 shadow-2xl transition-all duration-300
                  ${isTouching ? 'scale-95 bg-white/5' : ''}
                `}>
                  <blockquote className="text-lg text-white/50 leading-relaxed mb-6">
                    “{testimonials[index].quote}”
                  </blockquote>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-semibold">
                        {testimonials[index].name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonials[index].role} — {testimonials[index].company}
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-white font-medium">
                      {testimonials[index].company}
                    </div>
                  </div>
                </div>

                {/* Swipe Indicator for Mobile */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 md:hidden transition-opacity">
                  Swipe to navigate
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}