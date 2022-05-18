import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { useData } from "../../../context/DataProvider";
import { deletePlaylistBasedOnPlaylistId } from "../../../services";
import "./playlistListingCard.css";
export const PlaylistListingCard = ({ list }) => {
    const { isExpanded, dispatch } = useData();
    const { login } = useAuth()
    const { title, videos, _id } = list;
    const navigate = useNavigate();
    const navigateToSelectedPlaylist = (_id) => {
        navigate(`/playlist-listing/${_id}`)
    }
    return (
        <div className={isExpanded ? "playlist-card  md-card-width mar-sm cursor_" : "playlist-card  xl-card-width mar-sm cursor_"} >
            <div className="card-header half-colored pos-relative">
                <div className="image-div pos-relative">
                    {
                        videos.length > 0 ?
                            <img className="card-img" alt="video-img" src={`https://i.ytimg.com/vi/${videos[0]._id}/0.jpg`} /> :
                            <img className="card-img" alt="video-img" src={`https://i.ytimg.com/vi/USc9rJbWPAs/0.jpg`} />
                    }
                    <Icon className="iconify text-5 bold remove-icon cursor_ hamberger" icon="ant-design:close-circle-outlined" onClick={() => login ? deletePlaylistBasedOnPlaylistId(dispatch, _id, localStorage.getItem("token")) : navigate("/login")} />

                </div>
                <div className="icon-section">
                    <Icon className="iconify text-5 bold hamberger" icon="ant-design:play-circle-filled" onClick={() => navigateToSelectedPlaylist(_id)} />
                </div>
                <div className="mar-sm">
                    <div className="d-flex items-center justify-center">
                        <div className="head-4">{title}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}