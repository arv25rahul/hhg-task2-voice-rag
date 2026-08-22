"use client";

import { InteractiveBg } from "@/components/InteractiveBg";
import { TelemetryProfiler } from "@/components/TelemetryProfiler";
import { VectorExplorer } from "@/components/VectorExplorer";
import { VoiceInterface } from "@/components/VoiceInterface";
import gsap from "gsap";
import { Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
  const headerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const voiceSectionRef = useRef<HTMLElement | null>(null);
  const chunksSectionRef = useRef<HTMLElement | null>(null);
  const telemetrySectionRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // GSAP Staggered Entrance Animations
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" }
        );
      }

      if (voiceSectionRef.current) {
        gsap.fromTo(
          voiceSectionRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: "power3.out" }
        );
      }

      if (chunksSectionRef.current) {
        gsap.fromTo(
          chunksSectionRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.45, ease: "power3.out" }
        );
      }

      if (telemetrySectionRef.current) {
        gsap.fromTo(
          telemetrySectionRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: "power3.out" }
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.75, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#0a0e0f] text-[#e0ffef] selection:bg-[#00ffaa] selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Live Interactive Background */}
      <InteractiveBg />

      {/* =====================================================
          1. FIXED TOP HEADER (GSAP ANIMATED)
      ====================================================== */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 lg:px-16 py-4 flex items-center justify-between opacity-0"
      >
        <div className="flex items-center gap-3">
          {/* Terminal + Palm Tree Icon Mark */}
          <div className="w-9 h-9 rounded-lg bg-[#141a1c] border border-[#00ffaa]/20 p-2 flex items-center justify-center gap-0.5 relative group hover:border-[#00ffaa]/40 transition-colors">
            <span className="text-[#00ffaa] font-mono text-lg leading-none">&gt;</span>
            <span className="absolute -bottom-0.5 right-1 text-[#ff6b35] text-[8px] leading-none">🌴</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                HHG<span className="text-[#00ffaa]">_</span>RAG
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141a1c] border border-[#00ffaa]/20 text-[#00ffaa] font-semibold">
                v2.0
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#94a89c]">
              Voice RAG • Tropical Terminal Speed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ffaa]/20 bg-[#141a1c] text-[#94a89c]">
            <Zap className="w-3.5 h-3.5 text-[#00ffaa]" />
            <span>sub-200ms target</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ffaa]/20 bg-[#141a1c] text-[#00ffaa]">
            <span className="w-2 h-2 rounded-full bg-[#00ffaa] animate-pulse" />
            <span>ready</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          2. MAIN CONTENT
      ====================================================== */}
      <div className="app-content relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 pt-28 pb-16 flex-1 space-y-16">

        {/* =====================================================
            HERO INTRO SECTION
        ====================================================== */}
        <section ref={heroRef} className="text-center space-y-5 max-w-3xl mx-auto opacity-0 pt-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[#e0ffef] bg-[#141a1c]/90 border border-[#00ffaa]/30 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] animate-pulse" />
            <span>🌴 Hacker House Goa · Voice RAG · 241,572 Chunks</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight font-sans">
            RoopX Meets{" "}
            <span className="bg-gradient-to-r from-[#00ffaa] via-[#00d9ff] to-[#ff6b35] bg-clip-text text-transparent">
              Terminal Speed
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#94a89c] max-w-2xl mx-auto leading-relaxed font-sans">
            Speak in Hindi or English. Get vector-grounded answers from{" "}
            <span className="text-[#e0ffef] font-mono text-xs px-1.5 py-0.5 rounded bg-[#141a1c] border border-[#00ffaa]/20">
              ai4bharat/MSMARCO-XI
            </span>{" "}
            with end-to-end telemetry in sub-200ms. Built at the beach, optimized for speed.
          </p>

          {/* Feature Highlights Pill Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-mono text-[#94a89c]">
            <span className="px-2.5 py-1 rounded-md bg-[#141a1c] border border-[#00ffaa]/20 flex items-center gap-1.5 hover:border-[#00ffaa]/40 transition-colors">
              <Zap className="w-3.5 h-3.5 text-[#00ffaa]" /> &lt;200ms Target
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#141a1c] border border-[#00d9ff]/20 flex items-center gap-1.5 hover:border-[#00d9ff]/40 transition-colors">
              <span className="text-[#00d9ff]">●</span> Sarvam Saaras v3
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#141a1c] border border-[#00ffaa]/20 flex items-center gap-1.5 hover:border-[#00ffaa]/40 transition-colors">
              <span className="text-[#00ffaa]">●</span> MongoDB Atlas HNSW
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#141a1c] border border-[#ff6b35]/20 flex items-center gap-1.5 hover:border-[#ff6b35]/40 transition-colors">
              <span className="text-[#ff6b35]">●</span> Guardrail Verified
            </span>
          </div>
        </section>

        {/* Hero Voice Console */}
        <section ref={voiceSectionRef} id="voice-console" className="w-full opacity-0">
          <VoiceInterface />
        </section>

        {/* Live Vector Database Chunks Explorer (Connected to MongoDB Atlas) */}
        <section ref={chunksSectionRef} id="vector-chunks" className="w-full pt-8 border-t border-[#00ffaa]/10 opacity-0">
          <VectorExplorer />
        </section>

        {/* Live Latency Telemetry Profiler & Benchmark Engine */}
        <section ref={telemetrySectionRef} id="telemetry-architecture" className="w-full pt-8 border-t border-[#00ffaa]/10 opacity-0">
          <TelemetryProfiler />
        </section>

      </div>

      {/* =====================================================
          3. REDESIGNED FOOTER (GSAP ANIMATED, MULTI-COLUMN)
      ====================================================== */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full pt-12 pb-8 px-6 sm:px-12 lg:px-16 font-mono text-xs text-[#94a89c] opacity-0 space-y-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Core Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#141a1c] border border-[#00ffaa]/30 p-1.5 flex items-center justify-center relative">
                <span className="text-[#00ffaa] font-mono text-sm leading-none">&gt;</span>
                <span className="absolute -bottom-0.5 -right-0.5 text-[8px]">🌴</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight font-mono">
                HHG<span className="text-[#00ffaa]">_</span>RAG
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#141a1c] border border-[#00ffaa]/20 text-[#00ffaa]">
                v2.0
              </span>
            </div>
            <p className="text-[#94a89c] text-xs leading-relaxed font-sans">
              High-speed Voice RAG built where the palm trees meet terminal windows. Indic multilingual retrieval with sub-200ms latency.
            </p>
          </div>

          {/* Col 2: Hackathon & Official Site */}
          <div className="space-y-2.5">
            <span className="text-white font-bold text-xs uppercase tracking-wider block">
              Event & Challenge
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://hhgoa.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e0ffef] hover:text-[#00ffaa] underline underline-offset-2 transition-colors flex items-center gap-1 font-semibold"
                >
                  Hacker House Goa (hhgoa.com ↗)
                </a>
              </li>
              <li className="text-[#94a89c]">Task 2: Voice-Enabled RAG</li>
              <li className="text-[#94a89c]">Timeline: Aug 13 – Aug 22, 2026</li>
            </ul>
          </div>

          {/* Col 3: Dataset & Corpus */}
          <div className="space-y-2.5">
            <span className="text-white font-bold text-xs uppercase tracking-wider block">
              Dataset & Knowledge
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://huggingface.co/datasets/ai4bharat/MSMARCO-XI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e0ffef] hover:text-[#00d9ff] underline underline-offset-2 transition-colors flex items-center gap-1"
                >
                  ai4bharat/MSMARCO-XI ↗
                </a>
              </li>
              <li className="text-[#94a89c]">241,572 Multilingual Chunks</li>
              <li className="text-[#94a89c]">Hindi · English</li>
            </ul>
          </div>

          {/* Col 4: Team & Mandatory Hashtag */}
          <div className="space-y-3 flex flex-col items-start lg:items-end">
            <span className="text-white font-bold text-xs uppercase tracking-wider">
              Submission & Team
            </span>
            <div className="text-[#e0ffef] text-xs">
              Built with 🌴 & ⚡ by <strong className="text-white font-bold">Team RoopX</strong>
            </div>
            <a
              href="https://hhgoa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00ffaa]/10 border border-[#00ffaa]/40 text-[#00ffaa] font-extrabold text-xs tracking-wider shadow-sm hover:bg-[#00ffaa]/20 hover:shadow-[0_0_15px_rgba(0,255,170,0.3)] transition-all"
            >
              <span>#RAGInGoa</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#576660] font-mono">
          <div>
            © 2026 Hacker House Goa Voice RAG · Team Probix · Task 2 Submission
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] animate-pulse" />
            <span className="text-[#94a89c]">Pipeline Target: &lt;200ms · Beach-to-Terminal</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
