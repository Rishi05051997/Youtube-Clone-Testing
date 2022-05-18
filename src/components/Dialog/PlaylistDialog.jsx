import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { getAllPlaylist, AddVideoToSelectedPlaylist, removeVideoFromSelectedPlaylist } from "../../services";
import "./playlistDialog.css";

export const PlaylistDialog = () => {
    const { state: { playlists }, dispatch, dialog, setDialog, dialogData } = useData();
    const { login } = useAuth();
    const [playlistData, setPlayListData] = useState({ title: "" });
    const [showInput, setShowInput] = useState(false);
    const navigate = useNavigate();
    const AddPlaylistHandler = () => {
        setShowInput(true)
        if (login) {
            playlistData.title && getAllPlaylist(dispatch, playlistData, localStorage.getItem("token"), setShowInput)
            setPlayListData((list) => ({
                ...list,
                title: ""
            }))
        } else {
            navigate("/login")
        }
    }
    return (
        <>
            <div className={dialog ? "modal-content pad-md md-modal-width " : "display-none"}>
                <div className="head-2 pos-relative">Save to
                    <Icon className="iconify remove-icon cursor_" onClick={() => setDialog(val => !val)} icon="ant-design:close-circle-outlined" />
                </div>
                {
                    playlists.length > 0 &&
                    (
                        playlists.map((list, i) => {
                            const isVideoPresentInPlaylist = list.videos?.some(
                                (list) => list._id === dialogData._id
                            );
                            return (
                                <div key={i} className="text-2 bold d-flex items-center">
                                    <legend className="mar-x-3">{list.title}</legend>
                                    <input type="checkbox" checked={isVideoPresentInPlaylist} onChange={(e) => e.target.checked ? AddVideoToSelectedPlaylist(dispatch, list, dialogData, localStorage.getItem("token")) : removeVideoFromSelectedPlaylist(dispatch, list, dialogData, localStorage.getItem("token"))} />
                                </div>
                            )
                        })
                    )
                }

                <div className={showInput ? "d-flex items-center mar-y-3" : "display-none"}>
                    <label className="text-3 mar-x-2">Name :</label>
                    <input
                        id="email"
                        type="text"
                        className="mar-y-1 custom-input pad-sm"
                        autoComplete="off"
                        value={playlistData.title}
                        onChange={(e) => setPlayListData((list) => ({
                            ...list,
                            title: e.target.value
                        }))}

                    />

                </div>

                <button type="submit" className="playlist-btn text-2 mar-y-3 bold pad-xs cursor_" onClick={() => AddPlaylistHandler()}>Create A New Playlist</button>
            </div>
            <div className={dialog ? "overlay" : "display-none"}></div>
        </>
    )
}