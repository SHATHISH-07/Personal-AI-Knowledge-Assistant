import LoginForm from "@/components/auth/LoginForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "true") {
      localStorage.setItem("openluma_email_verified", "true");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center dark:bg-black">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to OpenLuma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <GoogleAuthButton />
          <p className="text-sm text-center">
            No account? <Link to="/register">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
