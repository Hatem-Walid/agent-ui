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

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

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
    if (isInView) startAutoplay();
    else stopAutoplay();
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
            "linear-gradient(180deg, #0a0b1f 0%, #101532 100%)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 1,
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
                className="p-3 rounded-lg bg-white/1000 hover:bg-gradient-to-r from-purple-900 to-blue-5 transition"
              >
                <ChevronLeft size={18} color="white" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-lg bg-white/ hover:bg-gradient-to-r from-blue-5 to-purple-900 transition"
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
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-xl relative"
              >
                <div className="backdrop-blur-2xl  bg-gradient-to-r from-blue-1 to-purple-900 border border-white/1 rounded-4xl p-10 shadow-2xl">
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
