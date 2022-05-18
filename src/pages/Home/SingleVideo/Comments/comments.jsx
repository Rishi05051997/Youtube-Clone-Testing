import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useData } from "../../../../context/DataProvider";
import { useAuth } from "./../../../../context/AuthProvider";
import "./comments.css";

export const Comments = ({ comments, videoId }) => {
    const { login } = useAuth();
    const [comment, setComment] = useState({
        user: "",
        comment: "",
        color: "hotpink"
    });
    const { dispatch } = useData();
    const navigate = useNavigate();
    const commentFormHandler = (e) => {
        e.preventDefault();
        if (login) {
            const { firstName, lastName } = login;
            const commentObject = {
                ...comment,
                user: `${firstName} ${lastName}`,
                comment: comment.comment,

            }
            dispatch({
                type: "COMMENT-SETTER",
                payload: {
                    videoId,
                    commentObject
                }
            })
            setComment({
                user: "",
                comment: "",
                color: "hotpink"
            })

        } else {
            navigate("/login");
        }
    }


    return (
        <>
            <section className="mar-md d-flex  text-2 items-center">
                <div className=" d-flex items-center justify-center mar-x-2 comment-badge hotpink pad-md bold">R</div>
                <form onSubmit={commentFormHandler} className="d-flex  text-2 items-center" >
                    <input
                        className="comment-input mar-x-2"
                        type="text"
                        placeholder="Add Comment here...."
                        value={comment.comment}
                        onChange={(e) => setComment((val) => ({
                            ...val,
                            comment: e.target.value
                        }))}
                    />
                    <button onClick={() => setComment((val) => ({
                        ...val,
                        comment: ""
                    }))} className="btn btn-outline-secondory">Clear</button>
                    <button type="submit" className="btn btn-secondory">comment</button>
                </form>

            </section>
            <section className="comments-listing mar-md">
                {
                    comments.map(({ user, comment, color }, i) => (
                        <div key={i} className="d-flex items-center mar-y-3">
                            <div className={`text-2 d-flex items-center justify-center mar-x-2 comment-badge ${color} pad-md bold`}>{user[0]}</div>
                            <div className="flex-col">
                                <div className="text-3 bold">
                                    {user}
                                </div>
                                <div className="text-2 bold">
                                    {comment}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    )
}