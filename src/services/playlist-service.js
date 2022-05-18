import axios from "axios";
export const initAllPlaylist = (dispatch, token) => {
    try {
        (async () => {
            const { data: { playlists } } = await axios.get(
                `/api/user/playlists`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            playlists && dispatch({ type: "INIT-PLAYLIST", payload: playlists })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in getting playlist!!" })
    }
}

export const getAllPlaylist = (dispatch, playlist, token, setShowInput) => {
    try {
        (async () => {
            const { data: { playlists } } = await axios.post(
                `/api/user/playlists`,
                {
                    playlist
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            playlists && dispatch({ type: "ADD-PLAYLIST", payload: playlists })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Adding Playlist" })
    } finally {
        setShowInput(false)
    }
}

export const AddVideoToSelectedPlaylist = (dispatch, playlists, video, token) => {
    try {
        (async () => {
            const { data: { playlist } } = await axios.post(
                `/api/user/playlists/${playlists._id}`,
                {
                    video
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            playlist && dispatch({ type: "ADD-VIDEO-TO-PLAYLIST", payload: playlist })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Adding Playlist" })
    }
}

export const removeVideoFromSelectedPlaylist = (dispatch, playlistId, videoId, token) => {
    try {
        (async () => {
            const { data: { playlist } } = await axios.delete(
                `/api/user/playlists/${playlistId}/${videoId}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            playlist && dispatch({ type: "REMOVE-VIDEO-FROM-PLAYLIST", payload: playlist })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Removing Playlist" })
    }
}

export const showPlaylistBasedOnPlaylistId = (dispatch, playlists, token) => {
    try {
        (async () => {
            const { data: { playlist } } = await axios.get(
                `/api/user/playlists/${playlists._id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            return playlist;
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Removing Playlist" })
    }
}

export const deletePlaylistBasedOnPlaylistId = (dispatch, playlistId, token) => {
    try {
        (async () => {
            const { data: { playlists } } = await axios.delete(
                `/api/user/playlists/${playlistId}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            playlists && dispatch({ type: "REMOVE-PLAYLIST-FROM-PLAYLIST", payload: playlists })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Removing Playlist" })
    }
}

