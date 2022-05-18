import { useData } from "../../context/DataProvider";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import "./historyListing.css";
import { Icon } from '@iconify/react';
import { removeAllVideosFromHistory } from "../../services";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { EmptyContainer } from "../../components/EmptyContainer/EmptyContainer";

export const HistoryListing = () => {
    const { state: { videos }, isExpanded, dispatch } = useData();
    const { login } = useAuth();
    const navigate = useNavigate();
    const savedVideos = videos.filter(({ isInHistory }) => isInHistory === true);

    useDocumentTitle("CARS TUBE | FEATURED HISTORY")
    return (
        <>
            {
                savedVideos.length > 0 ? (
                    <section className={isExpanded ? "info-tube-main-content pos-relative" : "info-tube-main-content-collasped pos-relative"}>
                        <button className="btn btn-danger text-3 clear-btn" onClick={() => login ? removeAllVideosFromHistory(dispatch, localStorage.getItem("token")) : navigate("/login")}>
                            <Icon icon="fluent:delete-24-filled" />Clear History
                        </button>
                        <section className={savedVideos.length <= 3 ? "info-tube-content history-content " : "info-tube-content history-content justify-between"}>

                            {
                                savedVideos.map((video, i) => (<VideoCard key={i} video={video} action="REMOVE-FROM-HISTORY" removeUIcon={<Icon className="iconify text-5 bold remove-icon cursor_" icon="ant-design:close-circle-outlined" />} />))
                            }


                        </section>
                    </section>) : (
                    <EmptyContainer title="No videos Present in History" />
                )
            }
        </>

    )
}