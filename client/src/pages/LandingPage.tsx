import { Link } from "react-router-dom";
import logo from "/assets/favicon.ico";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#181818] text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Grid - Made subtler for the gray theme */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-[#181818]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8  flex items-center justify-center ">
              <img src={logo} alt="OL" className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              OpenLuma
            </h1>
          </div>

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
              className="hover:text-white transition-colors"
            >
              Source
            </a>
            <a href="#poweredby" className="hover:text-white transition-colors">
              Powered By
            </a>
          </nav>

          <div className="flex items-center gap-4">
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
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-36 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-white/5 rounded-full bg-[#212121] shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-zinc-300 tracking-wide">
            SYSTEM ONLINE: v2.0
          </span>
        </div>

        <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8 text-white">
          Your Knowledge. <br />
          <span className="text-zinc-500">Vectorized & Private.</span>
        </h2>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
          A full-stack RAG assistant that turns your codebase and notes into an
          intelligent query engine. Zero public data training. 100% ownership.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-24">
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
        <div className="relative w-full max-w-5xl group perspective-[1000px]">
          <div className="relative w-full bg-[#212121] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:-translate-y-1">
            {/* Header */}
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
            <div className="p-0 grid grid-cols-12 h-112.5 font-mono text-xs text-left">
              {/* Sidebar */}
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
              <div className="col-span-12 md:col-span-9 p-8 bg-[#181818] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />

                <div className="space-y-6">
                  {/* Log Entry 1 */}
                  <div className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1">
                      <span>14:02:21</span>
                      <span className="text-purple-400">POST</span>
                      <span>/api/v1/ask</span>
                    </div>
                    <div className="pl-20 text-zinc-300">
                      {`{ query: "How is JWT implemented?" }`}
                    </div>
                  </div>

                  {/* Log Entry 2 */}
                  <div className="font-mono relative">
                    <div className="absolute left-[3.8rem] top-2 bottom-0 w-px bg-white/10"></div>
                    <div className="flex gap-3 text-zinc-500 mb-1">
                      <span>14:02:22</span>
                      <span className="text-blue-400">EMBED</span>
                    </div>
                    <div className="pl-20 text-zinc-400">
                      Generating 1536-dim vector via OpenAI...
                    </div>
                  </div>

                  {/* Log Entry 3 */}
                  <div className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1">
                      <span>14:02:22</span>
                      <span className="text-yellow-400">QDRANT</span>
                    </div>
                    <div className="pl-20 text-zinc-300 bg-[#212121] p-3 rounded border border-white/5 border-l-2 border-l-yellow-500">
                      <span className="text-zinc-500 block text-[10px] mb-1">
                        SEARCH_RESULT
                      </span>
                      Matched 3 chunks (Score: 0.94) in{" "}
                      <span className="text-white">auth.service.ts</span>
                    </div>
                  </div>

                  {/* Log Entry 4 */}
                  <div id="poweredby" className="font-mono">
                    <div className="flex gap-3 text-zinc-500 mb-1">
                      <span>14:02:23</span>
                      <span className="text-green-400">READY</span>
                    </div>
                    <div className="pl-20 text-green-400/80 animate-pulse">
                      _ Streaming response...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWERED BY SECTION - CLEANED UP */}
      <section className="py-16 bg-[#212121] border-y border-white/5">
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
      <section id="architecture" className="py-32 px-6 max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="py-32 px-6 text-center bg-[#212121]/50 border-t border-white/5 relative overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/5 via-[#212121] to-[#212121] opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Stop repeating yourself.
          </h3>
          <p className="text-zinc-400 text-lg mb-10">
            Upload your previous projects and let your AI assistant remember the
            implementation details for you.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-[#181818] px-10 py-4 rounded-xl font-bold hover:bg-zinc-200 transition shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 bg-[#181818] border-t border-white/5 text-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8  flex items-center justify-center">
                <img src={logo} alt="OL" className="w-6 h-6 opacity-70" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                OpenLuma
              </h1>
            </div>
            <div className="text-zinc-500 max-w-xs leading-relaxed">
              A Full-Stack RAG Knowledge System. <br />
              Salem, India.
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-zinc-500 font-mono text-lg">
            <a
              href="https://shathish2004.github.io/Shathish-Portfolio/"
              target="_blank"
              className="hover:text-white transition"
            >
              CREATOR
            </a>
            <a
              href="https://github.com/SHATHISH-07/Personal-AI-Knowledge-Assistant"
              target="_blank"
              className="hover:text-white transition"
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/shathish-kumaran/"
              target="_blank"
              className="hover:text-white transition"
            >
              LINKEDIN
            </a>
          </div>

          <div className="text-zinc-600 font-mono text-lg">
            © {new Date().getFullYear()} OPENLUMA.
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
  <div className="bg-[#212121] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 hover:shadow-xl group">
    <div className="text-zinc-600 font-mono text-xs mb-4 group-hover:text-indigo-400 transition-colors">
      {number}
    </div>
    <h4 className="text-lg font-bold mb-3 text-white">{title}</h4>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const TechPill = ({ label, color }: { label: string; color: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-[#181818] border border-white/5 rounded-full text-zinc-300 text-sm font-mono hover:border-white/20 transition-colors cursor-default">
    <div className={`w-2 h-2 rounded-full ${color}`}></div>
    {label}
  </div>
);

export default LandingPage;
