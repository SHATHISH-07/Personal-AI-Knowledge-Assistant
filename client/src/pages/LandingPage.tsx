import { useRef, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "/assets/favicon.ico";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-title",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=0.4",
        )
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-btns",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-dashboard",
          {
            y: 100,
            opacity: 0,
            rotationX: 15,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.6",
        );

      gsap.fromTo(
        ".tech-pill",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".cta-content",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#181818] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden"
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-[#181818]/90 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src={logo} alt="OL" className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              OpenLuma
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a
              href="#architecture"
              className="hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a
              href="https://github.com/SHATHISH-07/Personal-AI-Knowledge-Assistant"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Source
            </a>
            <a href="#poweredby" className="hover:text-white transition-colors">
              Powered By
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-zinc-400 hover:text-white transition"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-zinc-100 text-[#181818] px-5 py-2 rounded-lg text-sm font-bold hover:bg-white transition shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              Initialize
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#181818] border-b border-white/5 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col gap-4 text-zinc-400">
              <a
                href="#architecture"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Architecture
              </a>
              <a
                href="https://github.com/SHATHISH-07/Personal-AI-Knowledge-Assistant"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Source
              </a>
              <a
                href="#poweredby"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-white transition-colors"
              >
                Powered By
              </a>
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <Link
                to="/login"
                className="text-center py-2 text-zinc-400 hover:text-white transition"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-zinc-100 text-[#181818] px-5 py-3 rounded-lg text-sm font-bold hover:bg-white transition text-center"
              >
                Initialize
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-36 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center perspective-[1000px]">
        <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[0.95] mb-8 text-white">
          <span className="hero-title block">Your Knowledge.</span>
          <span className="hero-title block text-zinc-500">
            Vectorized & Private.
          </span>
        </h2>

        <p className="hero-desc text-base md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light px-4">
          A full-stack RAG assistant that turns your codebase and notes into an
          intelligent query engine. Zero public data training. 100% ownership.
        </p>

        <div className="hero-btns flex flex-col sm:flex-row gap-4 mb-24 w-full sm:w-auto px-4">
          <Link
            to="/register"
            className="bg-zinc-100 text-[#181818] h-12 px-8 rounded-xl font-bold hover:bg-white transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] duration-200"
          >
            Start Indexing
          </Link>
          <a
            href="#architecture"
            className="h-12 px-8 rounded-xl font-bold border border-white/10 bg-[#212121] hover:bg-[#2a2a2a] transition flex items-center justify-center text-zinc-300"
          >
            View Specs
          </a>
        </div>

        {/* DASHBOARD MOCKUP */}
        <div className="hero-dashboard relative w-full max-w-5xl group perspective-[1000px] px-2 md:px-0">
          <div className="relative w-full bg-[#212121] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:-translate-y-2 hover:rotate-x-2">
            <div className="h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[#333]" />
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                rag_engine_v1.sys
              </div>
            </div>

            {/* Body */}
            <div className="p-0 grid grid-cols-12 h-96 md:h-112.5 font-mono text-xs text-left">
              <div className="col-span-3 border-r border-white/5 bg-[#1c1c1c] p-5 hidden md:block">
                <div className="text-[10px] text-zinc-500 font-bold mb-4 tracking-widest uppercase">
                  SOURCES
                </div>
                <div className="space-y-3 text-zinc-400">
                  <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5 text-zinc-200">
                    <span className="opacity-50">📂</span> /src
                  </div>
                  <div className="pl-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />{" "}
                    auth.ts
                  </div>
                  <div className="pl-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
                    vector.py
                  </div>
                  <div className="pl-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />{" "}
                    notes.md
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-[10px] text-zinc-500 font-bold mb-4 tracking-widest uppercase">
                    METRICS
                  </div>
                  <div className="bg-[#181818] rounded p-3 space-y-2 border border-white/5">
                    <div className="flex justify-between text-zinc-400">
                      <span>VECTORS</span>
                      <span className="text-white">8,402</span>
                    </div>
                    <div className="w-full bg-[#333] h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Terminal */}
              <div className="col-span-12 md:col-span-9 p-4 md:p-8 bg-[#181818] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

                <div className="space-y-6">
                  <div className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1 text-[10px] md:text-xs">
                      <span>14:02:21</span>
                      <span className="text-purple-400">POST</span>
                      <span>/api/v1/ask</span>
                    </div>
                    <div className="pl-0 md:pl-20 text-zinc-300">
                      {`{ query: "How is JWT implemented?" }`}
                    </div>
                  </div>

                  <div className="font-mono relative">
                    <div className="hidden md:block absolute left-[3.8rem] top-2 bottom-0 w-px bg-white/10"></div>
                    <div className="flex gap-3 text-zinc-500 mb-1 text-[10px] md:text-xs">
                      <span>14:02:22</span>
                      <span className="text-blue-400">EMBED</span>
                    </div>
                    <div className="pl-0 md:pl-20 text-zinc-400">
                      Generating 1536-dim vector via OpenAI...
                    </div>
                  </div>

                  <div className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1 text-[10px] md:text-xs">
                      <span>14:02:22</span>
                      <span className="text-yellow-400">QDRANT</span>
                    </div>
                    <div className="pl-0 md:pl-20 text-zinc-300 bg-[#212121] p-3 rounded border border-white/5 border-l-2 border-l-yellow-500">
                      <span className="text-zinc-500 block text-[10px] mb-1">
                        SEARCH_RESULT
                      </span>
                      Matched 3 chunks (Score: 0.94) in{" "}
                      <span className="text-white break-all">
                        auth.service.ts
                      </span>
                    </div>
                  </div>

                  <div id="poweredby" className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1 text-[10px] md:text-xs">
                      <span>14:02:23</span>
                      <span className="text-green-400">READY</span>
                    </div>
                    <div className="pl-0 md:pl-20 text-green-400/80 animate-pulse">
                      _ Streaming response...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWERED BY SECTION */}
      <section className="tech-section py-16 bg-[#212121] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8">
            Built on Modern Infrastructure
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <TechPill label="MongoDB Atlas" color="bg-green-500" />
            <TechPill label="Qdrant Cloud" color="bg-red-500" />
            <TechPill label="NestJS" color="bg-red-600" />
            <TechPill label="React" color="bg-blue-400" />
            <TechPill label="Shadcn UI" color="bg-white" />
            <TechPill label="Google OAuth 2.0" color="bg-orange-500" />
            <TechPill label="Brevo Email" color="bg-emerald-500" />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section
        id="architecture"
        className="py-24 md:py-32 px-6 max-w-7xl mx-auto"
      >
        <div className="mb-20">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Core Architecture
          </h3>
          <div className="h-1 w-20 bg-zinc-600 mb-6 rounded-full"></div>
          <p className="text-zinc-400 max-w-xl text-lg">
            Built on a Retrieval-Augmented Generation (RAG) framework. We
            extract, chunk, and embed your data to eliminate hallucinations.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            number="01"
            title="Private Vault"
            description="Your data is isolated in your own MongoDB collection. No shared context. No public training data."
          />
          <FeatureCard
            number="02"
            title="Smart Chunking"
            description="We parse code by function blocks and text by conceptual paragraphs to preserve semantic meaning."
          />
          <FeatureCard
            number="03"
            title="Vector Search"
            description="Powered by Qdrant. We map your questions to the nearest vector embeddings for pinpoint accuracy."
          />
          <FeatureCard
            number="04"
            title="Soft Archiving"
            description="Maintain a clean workspace without losing history. Archive old specs or deprecated code instantly."
          />
          <FeatureCard
            number="05"
            title="Hybrid Auth"
            description="Secured via JWT and Google OAuth 2.0. Stateless session handling with aggressive rate limiting."
          />
          <FeatureCard
            number="06"
            title="Context Aware"
            description="The LLM answers using ONLY your provided data. If it's not in your docs, the AI won't guess."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-32 px-6 text-center bg-[#212121]/50 border-t border-white/5 relative overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/5 via-[#212121] to-[#212121] opacity-50 pointer-events-none"></div>
        <div className="cta-content relative z-10 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Stop repeating yourself.
          </h3>
          <p className="text-zinc-400 text-lg mb-10">
            Upload your previous projects and let your AI assistant remember the
            implementation details for you.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-[#181818] px-10 py-4 rounded-xl font-bold hover:bg-zinc-200 transition shadow-lg hover:scale-105 duration-200"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="w-full bg-[#181818] border-t border-white/5 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
            {/* 1. Brand & Description */}
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/5">
                  <img src={logo} alt="OL" className="w-5 h-5 opacity-80" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  OpenLuma
                </h1>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-62.5">
                A Full-Stack RAG Knowledge System. <br />
                Building the future of memory.
              </p>
              <p className="text-zinc-600 text-xs font-mono">Salem, India.</p>
            </div>

            {/* 2. Navigation Links */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
                <FooterLink href="https://shathish2004.github.io/Shathish-Portfolio/">
                  CREATOR
                </FooterLink>
                <FooterLink href="https://github.com/SHATHISH-07/Personal-AI-Knowledge-Assistant">
                  GITHUB
                </FooterLink>
                <FooterLink href="https://www.linkedin.com/in/shathish-kumaran/">
                  LINKEDIN
                </FooterLink>
              </nav>

              {/* 3. Copyright (Aligned with links on desktop) */}
              <div className="text-zinc-600 font-mono text-xs md:text-sm mt-2">
                © {new Date().getFullYear()} OPENLUMA. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reused Components

const FeatureCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="feature-card bg-[#212121]/70 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 hover:shadow-2xl group cursor-default">
    <div className="text-zinc-600 font-mono text-xs mb-4 group-hover:text-indigo-400 transition-colors">
      {number}
    </div>
    <h4 className="text-lg font-bold mb-3 text-white">{title}</h4>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const TechPill = ({ label, color }: { label: string; color: string }) => (
  <div className="tech-pill flex items-center gap-2 px-4 py-2 bg-[#181818] border border-white/5 rounded-full text-zinc-300 text-sm font-mono hover:border-white/20 hover:bg-white/5 transition-all cursor-default">
    <div className={`w-2 h-2 rounded-full ${color}`}></div>
    {label}
  </div>
);

const FooterLink = ({ href, children }: { href: string; children: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-sm font-mono text-zinc-500 hover:text-white transition-colors duration-200 tracking-wide"
  >
    {children}
  </a>
);

export default LandingPage;
