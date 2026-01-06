import { Button } from "@/components/ui/button";

const GoogleAuthButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 h-12 text-base font-semibold"
      onClick={handleGoogleLogin}
    >
      {/* Google Logo */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.68 1.22 9.18 3.6l6.82-6.82C35.9 2.43 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.92 6.15C12.43 13.02 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.14-3.14-.4-4.64H24v9.28h12.72c-.55 2.96-2.2 5.46-4.68 7.14l7.58 5.88c4.42-4.08 6.88-10.1 6.88-17.66z"
        />
        <path
          fill="#FBBC05"
          d="M10.48 28.37a14.5 14.5 0 0 1 0-8.74l-7.92-6.15a24 24 0 0 0 0 21.04l7.92-6.15z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.9-2.14 15.86-5.82l-7.58-5.88c-2.1 1.42-4.78 2.26-8.28 2.26-6.26 0-11.57-3.52-13.52-8.72l-7.92 6.15C6.51 42.62 14.62 48 24 48z"
        />
      </svg>

      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleAuthButton;
