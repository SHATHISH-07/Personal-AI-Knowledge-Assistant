import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import LoginForm from "@/components/auth/LoginForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "/assets/favicon.ico"; // Assuming you want the logo here too

const Login = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Elements Stagger In (Left Side)
      gsap.from(".animate-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // 2. 3D Mockup Float Entrance
      gsap.from(".animate-mockup", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4,
      });

      // 3. Continuous Floating Animation for Mockup
      gsap.to(".floating-mockup", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.6, // Wait for entrance to finish
      });

      // 4. Login Card Entrance (Right Side)
      gsap.from(".login-card-container", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#121212] overflow-hidden"
    >
      {/* LEFT SIDE - VISUALS (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col relative overflow-hidden bg-[#181818] border-r border-white/5 h-full">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4a4a4a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="z-20 relative p-12 pb-0 space-y-8 mt-12">
          {/* Brand */}
          <div className="animate-text space-y-4">
            <div className="flex items-center gap-3 ">
              <img src={logo} alt="OL" className="w-8 h-8" />
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                OpenLuma
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="animate-text text-2xl text-zinc-400 font-light leading-snug max-w-lg">
            Your personal space to think, build, and remember
            <span className="block text-white font-medium mt-2">
              an AI-powered Knowledge Assistant
            </span>
          </h2>

          {/* Description */}
          <p className="animate-text text-sm text-gray-400 max-w-md leading-relaxed">
            Stop losing ideas. Effortlessly transform your scattered notes into
            a queryable knowledge base.
          </p>
        </div>

        {/* 3D Visual Container */}
        <div className="animate-mockup absolute top-[50%] left-12 right-0 bottom-[-10%] z-10 perspective-[1000px] pointer-events-none select-none">
          {/* The Floating Element */}
          <div className="floating-mockup w-full h-full">
            <div
              className="relative w-full h-full bg-[#1e1e1e] border border-white/10 rounded-tl-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                          transform rotate-x-6 rotate-y-6 -rotate-z-2 scale-100 origin-top-right
                          overflow-hidden"
            >
              {/* Mock App Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-6 space-x-2 bg-[#252525]">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                <div className="ml-4 h-4 w-32 bg-white/10 rounded-full"></div>
              </div>

              {/* Mock App Body */}
              <div className="p-8 flex gap-8">
                {/* Mock Sidebar */}
                <div className="w-1/4 space-y-4">
                  <div className="h-3 w-16 bg-white/20 rounded-sm"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 w-full bg-white/5 rounded-sm"></div>
                    <div className="h-2 w-4/5 bg-white/5 rounded-sm"></div>
                    <div className="h-2 w-3/4 bg-white/5 rounded-sm"></div>
                  </div>
                </div>

                {/* Mock Main Area */}
                <div className="flex-1 space-y-6">
                  {/* The Search Bar */}
                  <div className="h-12 w-full bg-black/40 rounded-lg border border-white/5 flex items-center px-4">
                    <div className="h-2 w-4 bg-white/30 rounded-full mr-3"></div>
                    <div className="h-2 w-48 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Result Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-[#2a2a2a] rounded-lg border border-white/5 p-4 space-y-3">
                      <div className="h-2 w-12 bg-purple-500/50 rounded-full"></div>
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="h-32 bg-[#2a2a2a] rounded-lg border border-white/5 p-4 space-y-3 opacity-50">
                      <div className="h-2 w-12 bg-blue-500/50 rounded-full"></div>
                      <div className="h-2 w-full bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glass Overlay for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="animate-text absolute bottom-6 left-12 z-20">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} OpenLuma
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#121212] relative z-30 min-h-screen md:min-h-full">
        {/* Mobile Background Pattern (Only visible on small screens) */}
        <div
          className="md:hidden absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="login-card-container w-full max-w-md relative z-10">
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center border border-white/10 mb-3 shadow-lg">
              <img src={logo} alt="OL" className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              OpenLuma
            </h1>
          </div>

          <Card className="bg-[#181818] border-zinc-800 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center text-white font-bold tracking-tight">
                Welcome back
              </CardTitle>
              <p className="text-sm text-center text-zinc-400">
                Enter your details to access your dashboard
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <LoginForm />

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#181818] px-2 text-zinc-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <GoogleAuthButton />

              <p className="text-sm text-center text-zinc-500 pt-4">
                No account?{" "}
                <Link
                  to="/register"
                  className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
