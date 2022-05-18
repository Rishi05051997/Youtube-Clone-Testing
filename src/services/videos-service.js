import axios from "axios"
export const initAllVideos = (dispatch) => {
    try {
        (async () => {
            const { data: { videos } } = await axios.get(
                `/api/videos`,
            )
            videos && dispatch({ type: "INIT-VIDEOS", payload: videos })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in getting videos!!" })
    }
}

export const getVideoById = async (_id, setVideo, setLoader) => {
    try {
        (async () => {
            const { data: { video } } = await axios.get(
                `/api/video/${_id}`,
            )
            video && setVideo(video)
        })()
    } catch (error) {
        // dispatch({ type: "SHOW_TOAST", payload: "Error in getting  video!!" })
    } finally {
        setLoader(false)
    }
} 