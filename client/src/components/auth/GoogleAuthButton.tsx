import { Button } from "@/components/ui/button";

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      Continue with Google
    </Button>
  );
};

export default GoogleAuthButton;
