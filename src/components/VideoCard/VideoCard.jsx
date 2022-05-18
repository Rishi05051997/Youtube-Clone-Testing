import { Icon } from "@iconify/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { disLikeVideoBasedBasedOnVideoId, RemovedVideoFromWatchLater, RemoveVideoFromHistory, removeVideoFromSelectedPlaylist } from "../../services";
import { Pallet } from "../Pallet/Pallet";
import "./videocard.css"
export const VideoCard = ({ video, removeUIcon, action, playlistId }) => {
    const navigate = useNavigate();
    const { state: { playlists }, dispatch, isExpanded } = useData();
    const { _id, title, creator, uploaded, isLiked, isWatchLater, isInHistory } = video;
    const { login } = useAuth();
    const [isPalletOpen, setIsPalletOpen] = useState(false);
    const singleVideoNavigator = () => {
        navigate(`/single-video/${_id}`)
    }

    const isPlaylistPresent = playlists.find(({ _id }) => _id === playlistId)

    const removeHandler = (dispatch, video, token, action, playlistId) => {
        switch (action) {
            case "REMOVE-FROM-LIKE":
                disLikeVideoBasedBasedOnVideoId(dispatch, video, token)
                break;
            case "REMOVE-FROM-WATCH-LATER":
                RemovedVideoFromWatchLater(dispatch, video, token)
                break;
            case "REMOVE-FROM-HISTORY":
                RemoveVideoFromHistory(dispatch, video, token);
                break;
            case "REMOVE-VIDEO-FROM-SELECTED-PLAYLIST":
                removeVideoFromSelectedPlaylist(dispatch, playlistId, video._id, token);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={isExpanded ? "container-card md-card-width mar-sm cursor_" : "container-card xl-card-width mar-sm cursor_"} >
                <div className="card-header">
                    <div className="image-div pos-relative">
                        <img className="card-img" alt="video-img" src={`https://i.ytimg.com/vi/${_id}/0.jpg`} onClick={singleVideoNavigator} />
                        {
                            (isLiked || isWatchLater || isInHistory || isPlaylistPresent) && (<span onClick={() => login ? removeHandler(dispatch, video, localStorage.getItem("token"), action, playlistId) : navigate("/login")}>{removeUIcon}</span>)
                        }
                    </div>

                    <div className="header pad-sm">

                        <div className="d-flex items-center justify-between">
                            <div className="head-4">{title}</div>
                            <div className="pos-relative">
                                < Icon className="iconify text-2 cursor_" icon="bi:three-dots-vertical" onClick={() => setIsPalletOpen(val => !val)} />
                                < Pallet isPalletOpen={isPalletOpen} setIsPalletOpen={setIsPalletOpen} video={video} />
                            </div>

                        </div>
                        <div className="d-flex items-center justify-between mar-y-2">
                            <p className="text-2 bold">{creator}</p>
                            <p className="text-2 bold">{uploaded}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>)
}