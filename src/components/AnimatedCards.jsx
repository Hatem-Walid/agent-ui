import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 6000;

const testimonials = [
  {
    id: 1,
    name: "AI-Based Vulnerability Detection",
    role: "Detection Engine",
    company: "Frontend & Backend Code",
    quote:
      "Uses fine-tuned Transformer-based models to perform static code analysis and accurately detect security vulnerabilities, including XSS, SQL Injection, CSRF, and broken access control.",
  },
  {
    id: 2,
    name: "Context-Aware Automated Repair",
    role: "Repair Engine",
    company: "Source Code Level",
    quote:
      "Generates secure, context-aware code patches using sequence-to-sequence learning, ensuring syntactic correctness while preserving original application behavior.",
  },
  {
    id: 3,
    name: "Semantic Code Understanding",
    role: "Analysis Layer",
    company: "Code Semantics",
    quote:
      "Goes beyond rule-based pattern matching by understanding the semantic and structural representation of source code using pretrained language models.",
  },
  {
    id: 4,
    name: "Curated & Labeled Training Dataset",
    role: "Training Foundation",
    company: "OWASP & CWE Standards",
    quote:
      "Trained on a high-quality dataset of vulnerable and fixed code samples enriched using OWASP Top 10 and CWE vulnerability classifications.",
  },
  {
    id: 5,
    name: "Dual-Model Architecture",
    role: "System Design",
    company: "Detection & Repair Pipeline",
    quote:
      "Separates vulnerability detection and automated repair into two independent AI models, enabling better optimization, evaluation, and future extensibility.",
  },
  {
    id: 6,
    name: "Secure Deployment via Isolation Layer",
    role: "Security Architecture",
    company: "Raspberry Pi Proxy",
    quote:
      "Implements a Raspberry Pi–based proxy to enforce privilege isolation, protect sensitive API keys, and secure communication between AI services and the backend.",
  },
  {
    id: 7,
    name: "Validation & Human-in-the-Loop Control",
    role: "Safety Mechanism",
    company: "Validation & Testing Phase",
    quote:
      "Includes a validation phase where generated fixes are reviewed or tested to ensure functional correctness and prevent unsafe or regressive changes.",
  },
  {
    id: 8,
    name: "Scalable Research-Oriented Design",
    role: "System Scalability",
    company: "Extensible Architecture",
    quote:
      "Designed as a research-ready platform that supports experimentation with new models, vulnerability categories, and advanced repair validation techniques.",
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
            
            <h2 className="text-4xl font-extrabold text-gray-300 leading-tight mb-4">
             AI-powered vulnerability detection and automated code repair.
            </h2>
            <p className=" text-purple-300 mb-6">
              built to support secure development workflows
            </p>

            {/* Controls + Progress */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95 active:bg-white/30 min-h-11 min-w-11 flex items-center justify-center"
              >
                <ChevronLeft size={18} color="white" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition active:scale-95 active:bg-white/30 min-h-11 min-w-11 flex items-center justify-center"
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
                    className="h-2 bg-linear-to-r to-purple-500 from-blue-900"
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
                <div className={`backdrop-blur-sm bg-linear-to-r from-white/5 to-white/2 border border-white/1 rounded-4xl p-10 shadow-2xl transition-all duration-300
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