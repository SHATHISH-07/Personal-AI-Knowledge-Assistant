import RegisterForm from "@/components/auth/RegisterForm";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your OpenLuma account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          <GoogleAuthButton />
          <p className="text-sm text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
