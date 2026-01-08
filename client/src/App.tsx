import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [initializeAuth, isInitialized]);

  useEffect(() => {
    const onFocus = () => {
      useAuthStore.getState().initializeAuth();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("popstate", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("popstate", onFocus);
    };
  }, []);

  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" richColors theme="dark" />
    </>
  );
}

export default App;
