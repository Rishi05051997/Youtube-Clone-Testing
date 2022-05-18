export const VideoReducer = (state, action) => {
    switch (action.type) {
        case "INIT-VIDEOS":
            return {
                ...state,
                videos: [...action.payload].map((video) => ({
                    ...video,
                    isInHistory: false,
                    isWatchLater: false,
                    isLiked: false,
                }))
            }
        case "COMMENT-SETTER":
            const { videoId, commentObject } = action.payload;
            return {
                ...state,
                toastMsg: `New comment added successfully!!!`,
                videos: [...state.videos].map((video) => (
                    video._id === videoId ? { ...video, comments: [...video.comments].concat(commentObject) } : video
                ))
            }

        case "PLAYLIST-SETTER":

            return {
                ...state,
                toastMsg: `New comment added successfully!!!`,
                playlist: [...action.payload].map((play) => ({
                    ...play,
                }))
            }

        case "VIDEO-LIKE":
            return {
                ...state,
                toastMsg: `You liked this video!!!`,
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isLiked: action.payload.some(({ _id }) => _id === video._id)
                }))
            }

        case "GET-LIKED-VIDEOS":
            return {
                ...state,
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isLiked: action.payload.some(({ _id }) => _id === video._id)
                }))
            }

        case "VIDEO-DISLIKE":
            return {
                ...state,
                toastMsg: `You dislike this video!!!`,
                videos: [...state.videos].map((video) => (
                    video._id === action.payload._id ? { ...video, isLiked: !action.payload.isLiked } : video
                ))
            }
        case "INIT-WATCH-LATER":
            return {
                ...state,
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isWatchLater: action.payload.some(({ _id }) => _id === video._id)
                }))
            }
        case "ADD-TO-WATCH-LATER":
            return {
                ...state,
                toastMsg: `Video Added to Watch Later successfully!!`,
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isWatchLater: action.payload.some(({ _id }) => _id === video._id)
                }))
            }
        case "REMOVE-FROM-WATCH-LATER":

            return {
                ...state,
                toastMsg: `Video removed from Watch later!!!`,
                videos: [...state.videos].map((video) => (
                    video._id === action.payload._id ? { ...video, isWatchLater: !action.payload.isWatchLater } : video
                ))
            }

        case "INIT-VIDOES-IN-HISTORY":
            return {
                ...state,
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isInHistory: action.payload.some(({ _id }) => _id === video._id)
                }))
            }

        case "ADD-VIDEO-IN-HISTORY":
            return {
                ...state,
                toastMsg: "Video added to History Successfully!!!",
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isInHistory: action.payload.some(({ _id }) => _id === video._id)
                }))
            }

        case "DELETE-VIDEO-FROM-HISTORY":
            return {
                ...state,
                toastMsg: "Video deleted from History Successfully!!!",
                videos: [...state.videos].map((video) => (
                    video._id === action.payload._id ? { ...video, isInHistory: !action.payload.isInHistory } : video
                ))
            }

        case "DELETE-ALL-VIDEO-FROM-HISTORY":
            return {
                ...state,
                toastMsg: "All Videos removed from History Successfully!!!",
                videos: [...state.videos].map((video) => ({
                    ...video,
                    isInHistory: false
                }))
            }

        case "INIT-PLAYLIST":
            return {
                ...state,
                playlists: action.payload
            }

        case "ADD-PLAYLIST":
            return {
                ...state,
                toastMsg: "New Playlist created Successfully!!!",
                playlists: action.payload
            }

        case "ADD-VIDEO-TO-PLAYLIST":
            return {
                ...state,
                toastMsg: "Video Added to Playlist Successfully!!!",
                playlists: state.playlists.map((list) =>
                    list._id === action.payload._id ? action.payload : list
                )
            }


        case "REMOVE-VIDEO-FROM-PLAYLIST":
            return {
                ...state,
                toastMsg: "Video removed from Playlist Successfully!!!",
                playlists: state.playlists.map((list) =>
                    list._id === action.payload._id ? action.payload : list
                )
            }

        case "REMOVE-PLAYLIST-FROM-PLAYLIST":
            return {
                ...state,
                toastMsg: "Playlist deleted Successfully!!!",
                playlists: action.payload
            }


        case "INIT-CATERORIES":
            return {
                ...state,
                category: [
                    ...action.payload.map((categoryItem) => ({
                        ...categoryItem,
                        isActive: categoryItem.categoryName === "all" ? true : false,
                    })),
                ],
            }

        case "SORT-CATEGORY":
            return {
                ...state,
                sortBy: action.payload,
                category: [...state.category].map((item) =>
                    item.categoryName === action.payload
                        ? {
                            ...item,
                            isActive: true,
                        }
                        : {
                            ...item,
                            isActive: false,
                        }
                ),

            }

        case "SORT-BASED-ON-DATES":
            return {
                ...state,
                sortByDate: !state.sortByDate
            }

        case "SEARCH-BASED-ON-NAME":
            return {
                ...state,
                search: action.payload
            }

        case "SHOW_TOAST":
            return {
                ...state,
                toastMsg: action.payload
            };



        default:
            return state
    }
}