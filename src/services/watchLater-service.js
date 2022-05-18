import axios from "axios"

export const initWatchLater = (dispatch, token) => {
    try {
        (async () => {
            const { data: { watchlater } } = await axios.get(
                `/api/user/watchlater`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            watchlater && dispatch({ type: "INIT-WATCH-LATER", payload: watchlater })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in getting watchlater videos!!" })
    }
}

export const AddVideoToWatchLater = (dispatch, video, token) => {
    try {
        (async () => {
            const {
                data: {
                    watchlater
                }
            } = await axios.post(
                `/api/user/watchlater`,
                {
                    video
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            watchlater && dispatch({ type: "ADD-TO-WATCH-LATER", payload: watchlater })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in adding video to the watchlater!!" })
    }
}

export const RemovedVideoFromWatchLater = (dispatch, video, token) => {
    try {
        debugger;
        (async () => {
            const {
                data: {
                    watchlater
                }
            } = await axios.delete(
                `/api/user/watchlater/${video._id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            watchlater && dispatch({ type: "REMOVE-FROM-WATCH-LATER", payload: video })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in removing video from watchlater!!" })
    }
}