import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../context/DataProvider";
import { AsideVideoCard } from "./Aside/AsideVideoCard";
import { Icon } from "@iconify/react";

import "./singlevideo.css";
import { Comments } from "./Comments/comments";
import { useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { AddVideoToHistory, AddVideoToWatchLater, likeVideoBasedOnVideo } from "../../../services";
import { useDocumentTitle } from "../../../utils/useDocumentTitle";
export const SingleVideo = () => {
    const { videoId } = useParams();
    const { state: { videos }, isExpanded, dispatch } = useData();
    const [isCopy, setIsCopy] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const video = videos.find(({ _id }) => _id === videoId);
    const { _id, title, description, creator, comments, isLiked, isWatchLater, isInHistory } = video;

    useDocumentTitle(`CARS TUBE | ${title}`)

    const copyHandler = () => {
        navigator.clipboard.writeText(`http://localhost:3000/single-video/${_id}`)
        setIsCopy(true)
    }

    const addVideoToWishListHandler = (dispatch, video, token, isWatchLater) => {
        if (!isWatchLater) {
            AddVideoToWatchLater(dispatch, video, token)
        }
    }




    return (
        <>
            {/* < Layout login={login} /> */}
            <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                {/* <div className="info-tube-content"> */}
                <main className="d-flex">
                    <section className={`single-video-main-content pad-sm`}>
                        <iframe
                            className="info-tube-video"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${_id}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen=""
                        ></iframe>
                        <div className="head-2 bold mar-y-2">{title}</div>
                        <div className="text-2 bold mar-y-1">{creator}</div>
                        <div className="d-flex mar-y-3">
                            <button className={isLiked ? "Btn active pad-sm text-2" : "Btn notActive pad-sm text-2"} onClick={() => login ? likeVideoBasedOnVideo(video, dispatch, localStorage.getItem("token")) : navigate("/login")}>
                                < Icon className="iconify" icon="fontisto:like" />
                                Liked
                            </button>
                            <button onClick={() => login ? addVideoToWishListHandler(dispatch, video, localStorage.getItem("token"), isWatchLater) : navigate("/login")} className={isWatchLater ? "Btn active pad-sm text-2" : "Btn notActive pad-sm text-2"}>
                                < Icon className="iconify" icon="ic:baseline-watch-later" />
                                Watch Later
                            </button>
                            <button className={isCopy ? "Btn active pad-sm text-2" : "Btn notActive pad-sm text-2"} onClick={copyHandler}>
                                < Icon className="iconify" icon={isCopy ? "akar-icons:copy" : "fa:copy"} />
                                {isCopy ? "Copied" : "Copy"}
                            </button>
                            <button className={isInHistory ? "Btn active pad-sm text-2" : "Btn notActive pad-sm text-2"} onClick={() => login ? AddVideoToHistory(dispatch, localStorage.getItem("token"), video) : navigate("/login")}>
                                < Icon className="iconify" icon="bxs:save" />
                                {isInHistory ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className="text-3 bold mar-y-2">Description :</div>
                        <div className="text-2 mar-y-1">{description}</div>
                        <hr className="bold mar-y-2" />
                        <div className="d-flex text-3 bold mar-y-3">
                            < Icon className="iconify mar-x-1" icon="uil:comments-alt" />
                            <p className="mar-x-1">{comments.length}</p>
                            <p >comments :</p>
                        </div>
                        < Comments comments={comments} videoId={_id} />

                    </section>
                    <aside className="aside-videos-listing">
                        <div className="text-3 bold">Similar Videos</div>
                        {videos.map((video, i) => <AsideVideoCard key={i} video={video} />)}
                    </aside>
                </main>
                {/* </div> */}
            </section>

        </>
    )
}