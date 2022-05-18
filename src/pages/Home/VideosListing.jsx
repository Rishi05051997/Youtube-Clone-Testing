import { Icon } from "@iconify/react";
import { EmptyContainer } from "../../components/EmptyContainer/EmptyContainer";
import { useData } from "../../context/DataProvider";
import { sortingBasedOnDate, sortVideosBasedOnCatergoryName, seachBasedOnInput } from "../../utils/videosFilter";
import { VideoCard } from "./../../components/VideoCard/VideoCard";

export const VideosListing = () => {
    const { state: { videos, category, sortBy, sortByDate, search }, isExpanded, dispatch, setLoader } = useData();
    const isCategoryFill = category.length;
    const sortingHandler = (categoryName) => {
        setLoader(true)
        setTimeout(() => {
            dispatch({ type: "SORT-CATEGORY", payload: categoryName });
            setLoader(false)
        }, 500);
    }
    const searchBasedOnName = seachBasedOnInput([...videos], search)
    const sortBasedOnDate = sortingBasedOnDate(searchBasedOnName, sortByDate);
    const sorted = sortVideosBasedOnCatergoryName(sortBasedOnDate, sortBy);
    return (
        <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
            <header className="content-header">
                {
                    isCategoryFill && category.map(({ _id, categoryName, isActive }) =>
                        <button key={_id} onClick={() => sortingHandler(categoryName)} className={isActive ? "Btn active pad-sm text-2" : "Btn notActive pad-sm text-2"}>
                            {categoryName.toUpperCase()}
                        </button>)
                }
                <div className="Btn active pad-sm bold text-2" onClick={() => dispatch({ type: "SORT-BASED-ON-DATES" })}>
                    {sortByDate ? (
                        <>
                            <span>Clear</span>
                        </>
                    ) : (
                        <>
                            <Icon className="iconify" icon="bi:sort-up-alt" />
                            <span>Sort Latest</span>
                        </>
                    )}
                </div>
            </header>
            {
                sorted.length > 0 ? (
                    <section className={sorted.length < 3 ? "info-tube-content" : "info-tube-content justify-between"}>
                        {
                            sorted.map((video, i) => (<VideoCard key={i} video={video} />))
                        }
                    </section>
                ) : (
                    <div className="d-flex flex-col justify-between items-center">
                        <EmptyContainer title="No Videos Present" />
                    </div>
                )
            }
        </section>

    )
}