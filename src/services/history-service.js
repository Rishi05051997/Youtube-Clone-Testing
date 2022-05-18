import axios from "axios"

export const initAllHistoryVideos = (dispatch, token) => {
    try {
        (async () => {
            const { data: { history } } = await axios.get(
                `/api/user/history`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            history && dispatch({ type: "INIT-VIDOES-IN-HISTORY", payload: history })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Getting History Videos!!!" })
    }
}

export const AddVideoToHistory = (dispatch, token, video) => {
    try {
        (async () => {
            const { data: { history } } = await axios.post(
                `/api/user/history`,
                {
                    video
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            history && dispatch({ type: "ADD-VIDEO-IN-HISTORY", payload: history })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Adding Video!!!" })
    }
}

export const RemoveVideoFromHistory = (dispatch, video, token) => {
    try {
        (async () => {
            const { data: { history } } = await axios.delete(
                `/api/user/history/${video._id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            history && dispatch({ type: "DELETE-VIDEO-FROM-HISTORY", payload: video })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in deleting video from History" })
    }
}

export const removeAllVideosFromHistory = (dispatch, token) => {
    try {
        (async () => {
            const { data: { history } } = await axios.delete(
                `/api/user/history/all`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            history && dispatch({ type: "DELETE-ALL-VIDEO-FROM-HISTORY" })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in deleting video from History" })
    }
}