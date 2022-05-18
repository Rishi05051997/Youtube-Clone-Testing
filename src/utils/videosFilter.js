export const sortVideosBasedOnCatergoryName = (videos, sortBy) => {
    if (sortBy && sortBy !== "all") {
        return videos.filter(({ category }) => category === sortBy)
    }
    return [...videos]
}

export const sortingBasedOnDate = (videos, sortByDate) => {
    if (sortByDate) {
        return [...videos].sort((a, b) => {
            return new Date(b.uploaded) - new Date(a.uploaded)
        })
    }
    return [...videos]
}

export const seachBasedOnInput = (videos, search) => {
    return search
        ? [...videos].filter((video) => video.title.toLowerCase().includes(search.toLowerCase()))
        : [...videos];
}