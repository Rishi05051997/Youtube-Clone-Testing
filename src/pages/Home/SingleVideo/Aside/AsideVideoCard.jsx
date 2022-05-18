import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"
export const AsideVideoCard = ({ video }) => {
    const navigate = useNavigate();
    const { _id, title, creator, uploaded } = video;

    const singleVideoNavigator = () => {
        navigate(`/single-video/${_id}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }
    return (
        <div key={_id} className="container-card xl-card-width mar-md cursor_" onClick={singleVideoNavigator}>
            <div className="card-header">
                <div className="image-div">
                    <img className="card-img" alt="video-img" src={`https://i.ytimg.com/vi/${_id}/0.jpg`} />
                </div>
                <div className="header pad-sm">

                    <div className="d-flex items-center justify-between">
                        <div className="head-4">{title}</div>
                        < Icon className="iconify text-2 cursor_" icon="bi:three-dots-vertical" />
                    </div>
                    <div className="d-flex items-center justify-between mar-y-2">
                        <p className="text-2 bold">{creator}</p>
                        <p className="text-2 bold">{uploaded}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}