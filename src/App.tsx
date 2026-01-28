import { useEffect, useState } from "react";
import { AppLoader } from "./components/AppLoader/AppLoader"
import { AppRouter } from "./routes/AppRouter"
import { useAuthStore } from "./store/authStore";

function App() {

  const [showLoader, setShowLoader] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const refreshUser = useAuthStore(state => state.refreshUser);

  useEffect(() => {
    const initApp = async () => {
      try {
        await refreshUser();
      } catch {
        console.log('User not authorized or token expired');
      } finally {
        setIsAuthChecked(true);
      }
    }

    initApp();
  }, [refreshUser]);

  return (
    <>
      {showLoader ? <AppLoader onFinish={() => setShowLoader(false)} isDataLoaded={isAuthChecked} /> : <AppRouter />}
    </>
  )
}

export default App
