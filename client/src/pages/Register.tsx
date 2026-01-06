import RegisterForm from "@/components/auth/RegisterForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#212121]">
      {/* LEFT BRAND SECTION */}
      <div className="hidden md:flex flex-col relative overflow-hidden bg-[#181818] border-r border-white/5 h-full">
        {/* 1. Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#4a4a4a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* 2. Top Branding */}
        <div className="z-20 relative p-12 pb-0">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            OpenLuma
          </h1>
          <h2 className="text-xl text-gray-300 font-light leading-snug">
            Your personal space to think, build, and remember —
            <span className="block text-white font-medium mt-1">
              an AI-powered Knowledge Assistant
            </span>
          </h2>

          <h2 className="text-xl text-gray-400 font-light mb-6">
            Build your personal{" "}
            <span className="text-white font-medium">Knowledge System</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Capture ideas. Connect dots. Experience your second brain.
          </p>
        </div>

        {/* 3. The Creative: 3D Interface Visualization */}
        <div className="absolute top-[45%] left-12 right-0 bottom-[-10%] z-10 perspective-[1000px] pointer-events-none select-none">
          <div
            className="relative w-full h-full bg-[#1e1e1e] border border-white/10 rounded-tl-2xl shadow-2xl 
                          transform rotate-x-6 rotate-y-6 -rotate-z-2 scale-100 origin-top-right
                          overflow-hidden"
          >
            {/* Mock App Header */}
            <div className="h-12 border-b border-white/5 flex items-center px-6 space-x-2 bg-[#252525]">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              {/* Context Pill */}
              <div className="ml-4 h-5 w-32 bg-zinc-800 rounded text-[10px] flex items-center px-2 text-zinc-500 font-mono">
                checking-knowledge-base...
              </div>
            </div>

            {/* Mock App Body - CHAT / ASSISTANT INTERFACE */}
            <div className="flex h-full">
              {/* Sidebar (History) */}
              <div className="w-20 border-r border-white/5 bg-[#222] flex flex-col items-center py-6 space-y-4">
                <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5"></div>
                <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5 opacity-50"></div>
                <div className="w-8 h-8 bg-white/5 rounded-md border border-white/5 opacity-30"></div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 p-8 flex flex-col space-y-6 relative">
                {/* Message 1: AI/System (Left) */}
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

                {/* Message 2: User (Right) */}
                <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                  <div className="space-y-2">
                    <div className="p-4 bg-indigo-600/20 rounded-2xl rounded-tr-none border border-indigo-500/20 space-y-2">
                      <div className="h-2 w-40 bg-indigo-200/20 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Message 3: AI Generating (Left) */}
                <div className="flex gap-4 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 shrink-0 border border-indigo-500/30" />
                  <div className="space-y-2">
                    <div className="p-4 bg-[#2a2a2a] rounded-2xl rounded-tl-none border border-white/5">
                      {/* Thinking Animation Dots */}
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75" />
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area (Absolute Bottom) */}
                <div className="absolute bottom-20 left-8 right-8">
                  <div className="h-12 bg-[#252525] rounded-xl border border-white/10 flex items-center px-4 justify-between">
                    <div className="h-2 w-32 bg-white/10 rounded-full"></div>
                    <div className="w-6 h-6 bg-indigo-500 rounded-md opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent opacity-80" />
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-12 z-20">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} OpenLuma
          </p>
        </div>
      </div>

      {/* RIGHT REGISTER SECTION */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#212121] md:bg-[#121212] relative z-30">
        <Card className="w-full max-w-md bg-[#181818] border-zinc-800 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white font-bold tracking-tight">
              Create your account
            </CardTitle>
            <p className="text-sm text-center text-gray-400">
              Start building your personal knowledge workspace
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <RegisterForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#181818] px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleAuthButton />

            <p className="text-sm text-center text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:text-gray-200 underline underline-offset-4 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
