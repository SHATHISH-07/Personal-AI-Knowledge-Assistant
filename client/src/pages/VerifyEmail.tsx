import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resendVerification } from "@/api/auth.api";
import { Input } from "@/components/ui/input";

const RESEND_DELAY = 5 * 60;
const STORAGE_KEY = "openluma_resend_at";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (!lastSent) return;

    const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);

    if (elapsed < RESEND_DELAY) {
      setSecondsLeft(RESEND_DELAY - elapsed);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("openluma_email_verified") === "true") {
      window.location.replace("/login");
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
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await resendVerification({ email });

      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setSecondsLeft(RESEND_DELAY);
      setMessage("Verification email resent successfully.");
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify your email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            We’ve sent a verification link to your email address.
            <br />
            Please verify your email to continue.
          </p>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleResend}
            disabled={loading || secondsLeft > 0}
          >
            {secondsLeft > 0
              ? `Resend in ${minutes}:${seconds.toString().padStart(2, "0")}`
              : "Resend verification email"}
          </Button>

          {message && (
            <p className="text-sm text-center text-muted-foreground">
              {message}
            </p>
          )}

          <p className="text-xs text-center text-muted-foreground">
            After verifying, return to the login page to sign in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
