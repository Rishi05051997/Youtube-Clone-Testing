import { useDocumentTitle } from "../../utils/useDocumentTitle"
import { VideosListing } from "./VideosListing"

export const Home = () => {
    useDocumentTitle("CARS TUBE | HOME")
    return (
        <>
            < VideosListing />
        </>
    )

}