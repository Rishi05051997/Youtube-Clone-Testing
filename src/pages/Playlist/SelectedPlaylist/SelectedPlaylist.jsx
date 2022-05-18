import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom"
import { EmptyContainer } from "../../../components/EmptyContainer/EmptyContainer";
import { useData } from "../../../context/DataProvider";
import { useDocumentTitle } from "../../../utils/useDocumentTitle";
import { VideoCard } from "./../../../components/VideoCard/VideoCard";

export const SelectedPlaylist = () => {
    const { playlistId } = useParams();
    const { isExpanded, state: { playlists } } = useData();
    const playlistVideo = playlists?.find((list) => list._id === playlistId);
    const { title, videos } = playlistVideo;
    const isPlaylistFill = videos.length > 0;

    useDocumentTitle(`CARDS TUBE | ${title.toUpperCase()}`)

    return isPlaylistFill ? (
        <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
            <section className={videos.length < 3 ? "info-tube-content like-content" : "info-tube-content justify-between like-content"}>
                {
                    videos.map((video, i) => (<VideoCard key={i} video={video} playlistId={playlistId} action="REMOVE-VIDEO-FROM-SELECTED-PLAYLIST" removeUIcon={<Icon className="iconify text-5 bold remove-icon cursor_" icon="ant-design:close-circle-outlined" />} />))
                }
            </section>
        </section>
    ) : (
        <EmptyContainer title={`No Videos Present in ${title}`} />
    )

}