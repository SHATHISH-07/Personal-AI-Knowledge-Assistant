import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login");
      return;
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    initializeAuth().then(() => {
      navigate("/overview", { replace: true });
      toast.success("Successfully signed in with Google!");
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
