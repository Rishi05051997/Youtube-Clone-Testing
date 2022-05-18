import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { AddVideoToWatchLater } from "../../services";
import "./pallet.css";

export const Pallet = ({ isPalletOpen, setIsPalletOpen, video }) => {
    const { dispatch, setDialog, setDialogData } = useData();
    const { login } = useAuth();
    const navigate = useNavigate();

    const addToWishlistHandler = (dispatch, video, token) => {
        AddVideoToWatchLater(dispatch, video, token);
        setIsPalletOpen(val => !val);
    }

    const navigateToPlaylistManagement = () => {
        setDialogData(video);
        setDialog(val => !val);
        setIsPalletOpen(val => !val);
    }


    return isPalletOpen && (
        <>
            <div className="pallet">
                <ul className="pallet-list text-2 bold">
                    <div className="d-flex pallet-item pad-xs items-center">
                        <Icon className="iconify mar-x-2" icon="ic:baseline-watch-later" />
                        <li onClick={() => login ? addToWishlistHandler(dispatch, video, localStorage.getItem("token")) : navigate("/login")}>Add To Watch Later</li>
                    </div>
                    <div className="d-flex pallet-item pad-xs items-center">
                        <Icon className="iconify mar-x-2" icon="ant-design:play-circle-filled" />
                        <li onClick={() => login ? navigateToPlaylistManagement() : navigate("/login")}>Add To Playlist</li>
                    </div>
                </ul>
            </div>

        </>


    )
}