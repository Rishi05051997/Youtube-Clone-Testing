import { EmptyContainer } from "../../components/EmptyContainer/EmptyContainer";
import { useData } from "../../context/DataProvider";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import { PlaylistListingCard } from "./PlaylistListingCard/PlaylistListingCard";

export const PlaylistListing = () => {
    const { state: { playlists }, isExpanded } = useData();

    useDocumentTitle("CARS TUBE | FEATURED PLAYLIST")

    return (
        <>
            {
                playlists.length > 0 ? (
                    <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                        <section className={playlists.length <= 3 ? "info-tube-content like-content " : "info-tube-content like-content justify-between"}>

                            {
                                playlists.map((list, i) => (
                                    <div key={i}>
                                        <PlaylistListingCard list={list} />
                                    </div>
                                ))
                            }


                        </section>
                    </section>) : (
                    <EmptyContainer title="No Playlists Added Yet" />
                )
            }
        </>

    )
}