import "./watchLaterListing.css";
import { VideoCard } from "./../../components/VideoCard/VideoCard";
import { Icon } from '@iconify/react';
import { useData } from "../../context/DataProvider";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { EmptyContainer } from "../../components/EmptyContainer/EmptyContainer";

export const WatchLaterListing = () => {
    const { state: { videos }, isExpanded } = useData();
    const watchLaterVideos = videos.filter(({ isWatchLater }) => isWatchLater === true);

    useDocumentTitle("CARS TUBE | FEATURED WATCH LATER");
    return (
        <>
            {
                watchLaterVideos.length > 0 ? (
                    <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                        <section className={watchLaterVideos.length <= 3 ? "info-tube-content like-content" : "info-tube-content like-content justify-between"}>

                            {
                                watchLaterVideos.map((video, i) => (<VideoCard key={i} video={video} action="REMOVE-FROM-WATCH-LATER" removeUIcon={<Icon className="iconify text-5 bold remove-icon cursor_" icon="ant-design:close-circle-outlined" />} />))
                            }


                        </section>
                    </section>) : (
                    <EmptyContainer title="No Watch Later Videos" />
                )
            }
        </>

    )
}