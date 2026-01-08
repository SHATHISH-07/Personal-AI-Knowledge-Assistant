import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // inside RegisterForm.tsx

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });

      localStorage.setItem("verification_email", email);

      navigate("/verify-email");
      toast.success(
        "Registration successful - check your email for verification"
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";

      console.error("Registration Error Details:", error.response);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full h-11 text-base font-medium bg-[#212121] border-zinc-700 focus:border-zinc-500 text-zinc-100 placeholder:text-zinc-500"
      />

      <Input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full h-11 text-base font-medium bg-[#212121] border-zinc-700 focus:border-zinc-500 text-zinc-100 placeholder:text-zinc-500"
      />

      <Input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full h-11 text-base font-medium bg-[#212121] border-zinc-700 focus:border-zinc-500 text-zinc-100 placeholder:text-zinc-500"
      />

      <Button
        className="w-full h-12 text-base font-bold bg-white text-black hover:bg-zinc-200 transition-colors mt-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
