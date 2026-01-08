import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "/assets/favicon.ico";

const Register = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".animate-mockup", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.to(".floating-mockup", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.6,
      });

      gsap.from(".register-card-container", {
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
      <div className="hidden md:flex flex-col relative overflow-hidden bg-[#181818] border-r border-white/5 h-full">
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4a4a4a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="z-20 relative p-12 pb-0 mt-8 space-y-6">
          <div className="animate-text flex items-center gap-3 mb-2">
            <img src={logo} alt="OL" className="w-8 h-8 opacity-90" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              OpenLuma
            </h1>
          </div>

          <h2 className="animate-text text-xl text-zinc-400 font-light leading-snug">
            Your personal space to think, build, and remember —
            <span className="block text-white font-medium mt-1">
              an AI-powered Knowledge Assistant
            </span>
          </h2>

          <div className="animate-text">
            <h2 className="text-xl text-zinc-500 font-light mb-2">
              Build your personal{" "}
              <span className="text-white font-medium">Knowledge System</span>
            </h2>
            <p className="text-sm text-zinc-600 max-w-xs leading-relaxed">
              Capture ideas. Connect dots. Experience your second brain.
            </p>
          </div>
        </div>

        <div className="animate-mockup absolute top-[45%] left-12 right-0 bottom-[-10%] z-10 perspective-[1000px] pointer-events-none select-none">
          <div className="floating-mockup w-full h-full">
            <div
              className="relative w-full h-full bg-[#1e1e1e] border border-white/10 rounded-tl-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]
                          transform rotate-x-6 rotate-y-6 -rotate-z-2 scale-100 origin-top-right
                          overflow-hidden"
            >
              <div className="h-12 border-b border-white/5 flex items-center px-6 space-x-2 bg-[#252525]">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>

                <div className="ml-4 h-5 w-32 bg-zinc-800 rounded text-[10px] flex items-center px-2 text-zinc-500 font-mono">
                  checking-knowledge-base...
                </div>
              </div>

              <div className="flex h-full">
                <div className="w-20 border-r border-white/5 bg-[#222] flex flex-col items-center py-6 space-y-4">
                  <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5"></div>
                  <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5 opacity-50"></div>
                  <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5 opacity-30"></div>
                </div>

                <div className="flex-1 p-8 flex flex-col space-y-6 relative">
                  <div className="flex gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0 border border-indigo-500/30" />
                    <div className="space-y-2">
                      <div className="h-2 w-16 bg-zinc-700 rounded-full"></div>
                      <div className="p-4 bg-[#2a2a2a] rounded-2xl rounded-tl-none border border-white/5 space-y-2">
                        <div className="h-2 w-48 bg-white/20 rounded-full"></div>
                        <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                    <div className="space-y-2">
                      <div className="p-4 bg-indigo-600/20 rounded-2xl rounded-tr-none border border-indigo-500/20 space-y-2">
                        <div className="h-2 w-40 bg-indigo-200/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0 border border-indigo-500/30" />
                    <div className="space-y-2">
                      <div className="p-4 bg-[#2a2a2a] rounded-2xl rounded-tl-none border border-white/5">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75" />
                          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-20 left-8 right-8">
                    <div className="h-12 bg-[#252525] rounded-xl border border-white/10 flex items-center px-4 justify-between">
                      <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                      <div className="w-6 h-6 bg-indigo-500 rounded-md opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </div>

        <div className="animate-text absolute bottom-6 left-12 z-20">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} OpenLuma
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-[#121212] relative z-30 min-h-screen md:min-h-full">
        <div
          className="md:hidden absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="register-card-container w-full max-w-md relative z-10">
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
                Create your account
              </CardTitle>
              <p className="text-sm text-center text-zinc-400">
                Start building your personal knowledge workspace
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <RegisterForm />

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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-white underline underline-offset-4 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
