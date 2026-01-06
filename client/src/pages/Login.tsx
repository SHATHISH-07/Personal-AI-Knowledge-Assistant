import LoginForm from "@/components/auth/LoginForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-[#212121]">
      <div className="hidden md:flex flex-col relative overflow-hidden bg-[#181818] border-r border-white/5 h-full">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#4a4a4a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="z-20 relative p-12 pb-0 space-y-6">
          {/* Brand */}
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              OpenLuma
            </h1>
            <div className="w-12 h-px bg-white/20" />
          </div>

          {/* Tagline */}
          <h2 className="text-xl text-gray-300 font-light leading-snug">
            Your personal space to think, build, and remember —
            <span className="block text-white font-medium mt-1">
              an AI-powered Knowledge Assistant
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            Capture ideas as they happen, organize information effortlessly, and
            retrieve insights instantly. OpenLuma helps you turn scattered
            thoughts into structured knowledge.
          </p>
        </div>

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

              {/* Mock Main Area (The "Search" Visualization) */}
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

        {/* Footer Copyright */}
        <div className="absolute bottom-6 left-12 z-20">
          <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} OpenLuma
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#212121] md:bg-[#121212] relative z-30">
        <Card className="w-full max-w-md bg-[#181818] border-zinc-800 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white font-bold tracking-tight">
              Login to OpenLuma
            </CardTitle>
            <p className="text-sm text-center text-gray-400">
              Enter your details to access your dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <LoginForm />

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
              No account?{" "}
              <Link
                to="/register"
                className="text-white hover:text-gray-200 underline underline-offset-4 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
