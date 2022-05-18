import { Route, Routes } from "react-router-dom";
import { EmptyContainer } from "../components/EmptyContainer/EmptyContainer";
import { Login, Signup } from "../pages/Auth";
import { HistoryListing } from "../pages/History";
import { Home } from "../pages/Home";
import { SingleVideo } from "../pages/Home/SingleVideo/SingleVideo";
import { LikeListing } from "../pages/Like";
import { PlaylistListing, SelectedPlaylist } from "../pages/Playlist";
import { WatchLaterListing } from "../pages/WatchLater";
import { PrivateRouter } from "./PrivateRouter";

export const Router = () => {

    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/single-video/:videoId" element={<SingleVideo />} />

            <Route path="/liked-videos"
                element={
                    <PrivateRouter>
                        <LikeListing />
                    </PrivateRouter>
                } />
            <Route path="/watch-later-videos"
                element={
                    <PrivateRouter>
                        <WatchLaterListing />
                    </PrivateRouter>
                } />
            <Route path="/history"
                element={
                    <PrivateRouter>
                        <HistoryListing />
                    </PrivateRouter>
                } />
            <Route path="/playlist-listing"
                element={
                    <PrivateRouter>
                        <PlaylistListing />
                    </PrivateRouter>
                } />
            <Route path="/playlist-listing/:playlistId"
                element={
                    <PrivateRouter>
                        <SelectedPlaylist />
                    </PrivateRouter>
                } />

            <Route path="*"
                element={
                    <EmptyContainer title="404 Not Found" />
                } />

        </Routes>
    )
}