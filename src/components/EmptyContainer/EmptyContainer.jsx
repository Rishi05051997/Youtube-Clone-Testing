import { useData } from "../../context/DataProvider";
import empty from "./../../assets/empty.svg";
import "./emptycontainer.css"

export const EmptyContainer = ({ title }) => {
    const { isExpanded } = useData();
    return (
        <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
            <section className="like-content">
                <div className="d-flex justify-center items-center head-1">{title}</div>
                <div className="d-flex justify-center items-center">
                    <img className="no-content-img" src={empty} alt="no any content" />
                </div>

            </section>
        </section>
    );
}