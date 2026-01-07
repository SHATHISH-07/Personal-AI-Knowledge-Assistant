import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/overview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-12 text-base font-medium bg-[#212121] border-zinc-700 focus:border-zinc-500 text-zinc-100 placeholder:text-zinc-500"
        />

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 text-base font-medium bg-[#212121] border-zinc-700 focus:border-zinc-500 text-zinc-100 placeholder:text-zinc-500"
          />
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <Button
        className="w-full h-12 text-base font-bold bg-white text-black hover:bg-zinc-200 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
