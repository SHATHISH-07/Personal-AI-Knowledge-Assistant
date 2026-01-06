import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import { Spinner } from "@/components/ui/spinner";

const RootRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  return isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />;
};

export default RootRoute;
