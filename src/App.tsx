import { useState } from "react";
import { AppLoader } from "./components/AppLoader/AppLoader"
import { AppRouter } from "./routes/AppRouter"

function App() {

  const [isRefreshing, setIsRefreshing] = useState(true);

  const handleLoadingComplete = () => {
    setIsRefreshing(false);
  };

  return (
    <>
      {isRefreshing ? <AppLoader onFinish={handleLoadingComplete} isDataLoaded={true} /> : <AppRouter />}
    </>
  )
}

export default App
