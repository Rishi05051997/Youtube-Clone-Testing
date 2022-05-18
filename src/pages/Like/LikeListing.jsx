import { useData } from "../../context/DataProvider";
import { VideoCard } from "./../../components/VideoCard/VideoCard";
import "./likeListing.css";
import { Icon } from '@iconify/react';
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { EmptyContainer } from "../../components/EmptyContainer/EmptyContainer";

export const LikeListing = () => {
    const { state: { videos }, isExpanded } = useData();
    const likedVideos = videos.filter(({ isLiked }) => isLiked === true);

    useDocumentTitle("CARS TUBE | FEATURED LIKE")

    return (
        <>
            {
                likedVideos.length > 0 ? (
                    <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                        <section className={likedVideos.length <= 3 ? "info-tube-content like-content " : "info-tube-content like-content justify-between"}>

                            {
                                likedVideos.map((video, i) => (<VideoCard key={i} video={video} action="REMOVE-FROM-LIKE" removeUIcon={<Icon className="iconify text-5 bold remove-icon cursor_" icon="ant-design:close-circle-outlined" />} />))
                            }


                        </section>
                    </section>) : (
                    <EmptyContainer title="No Liked Videos" />
                )
            }
        </>

    )
}