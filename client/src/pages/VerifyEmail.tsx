import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resendVerification } from "@/api/auth.api";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

const RESEND_DELAY = 5 * 60;
const STORAGE_KEY = "openluma_resend_at";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (!lastSent) return;

    const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);

    if (elapsed < RESEND_DELAY) {
      setSecondsLeft(RESEND_DELAY - elapsed);
    }
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleResend = async () => {
    if (!email) {
      setMessage("Please enter your email address first.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage(null);
    setIsSuccess(false);

    try {
      await resendVerification({ email });

      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setSecondsLeft(RESEND_DELAY);
      setMessage("Verification email sent! Please check your inbox.");
      setIsSuccess(true);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Failed to resend verification email."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#121212] p-4">
      <Card className="w-full max-w-md bg-[#181818] border-zinc-800 shadow-2xl">
        <CardHeader className="space-y-1 pb-6">
          <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4 border border-zinc-700">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-center text-white font-bold">
            Verify your email
          </CardTitle>
          <p className="text-sm text-center text-zinc-400">
            We've sent a link to your inbox. Please verify your email to
            activate your account.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
                Confirm Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-[#212121] border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            <Button
              className={clsx(
                "w-full h-12 font-semibold transition-all",
                secondsLeft > 0
                  ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  : "bg-white text-black hover:bg-zinc-200"
              )}
              onClick={handleResend}
              disabled={loading || secondsLeft > 0}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : secondsLeft > 0 ? (
                `Resend available in ${minutes}:${seconds
                  .toString()
                  .padStart(2, "0")}`
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </div>

          {message && (
            <div
              className={clsx(
                "p-3 rounded-lg text-sm text-center border",
                isSuccess
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              )}
            >
              {isSuccess && (
                <CheckCircle2 className="inline-block w-4 h-4 mr-2 -mt-0.5" />
              )}
              {message}
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
