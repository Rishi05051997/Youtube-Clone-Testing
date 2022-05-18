import axios from "axios"

export const initAllCategories = (dispatch) => {
    try {
        (async () => {
            const { data: { categories } } = await axios.get(
                `/api/categories`,
            )
            categories && dispatch({ type: "INIT-CATERORIES", payload: categories })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Getting Video Categories!!!" })
    }
}

export const getCategoryNameBasedOnCategoryId = (dispatch, categoryId) => {
    try {
        (async () => {
            const { data: { category } } = await axios.get(
                `/api/category/${categoryId}`,
            )
            category && dispatch({ type: "SORT-CATEGORY", payload: category })
        })()
    } catch (error) {
        dispatch({ type: "SHOW_TOAST", payload: "Error in Getting Video Category!!!" })
    }
}