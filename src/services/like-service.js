import axios from "axios"

export const likeVideoBasedOnVideo = (video, dispatch, token) => {
    try {
        (async () => {
            const {
                data: { likes },
            } = await axios.post(
                "/api/user/likes",
                {
                    video,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            likes &&
                dispatch({
                    type: "VIDEO-LIKE",
                    payload: likes,
                });
        })();
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in liking this video!!" })
    }
}

export const disLikeVideoBasedBasedOnVideoId = (dispatch, video, token) => {
    try {
        (async () => {
            const { data: { likes } } = await axios.delete(
                `/api/user/likes/${video._Id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            likes && dispatch({ type: "VIDEO-DISLIKE", payload: video })
        })()

    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in disliking this video!!" })
    }
}

export const getAllLikedVideos = (dispatch, token) => {
    try {
        (async () => {
            const { data: { likes } } = await axios.get(
                `/api/user/likes`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            likes && dispatch({ type: "GET-LIKED-VIDEOS", payload: likes })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in getting liked  videos!!" })
    }
}

