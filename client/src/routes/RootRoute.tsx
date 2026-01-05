import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/LandingPage";
import { Spinner } from "@/components/ui/spinner";

const RootRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;

  return isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />;
};

export default RootRoute;
