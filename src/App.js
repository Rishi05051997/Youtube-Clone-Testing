import { useEffect } from "react";
import { PlaylistDialog } from "./components/Dialog/PlaylistDialog";
import { Layout } from "./components/Layout";
import { Toast } from "./components/Toast/Toast";
import { useAuth } from "./context/AuthProvider";
import { useData } from "./context/DataProvider";
import { Router } from "./Router/Router";
import { initAllVideos, getAllLikedVideos, initWatchLater, initAllHistoryVideos, initAllPlaylist, initAllCategories } from "./services";
import "./styles/main.css";
import "./index.css";
import { Oval } from "react-loader-spinner";

function App() {
  const { state: { toastMsg }, dispatch, loader } = useData();
  const { login } = useAuth();

  useEffect(() => {
    initAllVideos(dispatch);
    initAllCategories(dispatch);
  }, [dispatch])

  useEffect(() => {
    getAllLikedVideos(dispatch, localStorage.getItem("token"));
    initWatchLater(dispatch, localStorage.getItem("token"));
    initAllHistoryVideos(dispatch, localStorage.getItem("token"));
    initAllPlaylist(dispatch, localStorage.getItem("token"));
  }, [login, dispatch])

  return (
    <div className="app">
      <div className={loader ? "loader-container" : "display-none"}>

        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="#fc8019"
          secondaryColor="#FFBB77"
        />
      </div>
      <PlaylistDialog />
      <Layout login={login} />
      {toastMsg && <Toast toastMsg={toastMsg} />}

      < Router />
    </div>
  );
}

export default App;
