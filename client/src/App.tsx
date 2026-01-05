import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <AppRoutes />;
}

export default App;
