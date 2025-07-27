import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    allCategory : [],
    allSubCategory : [],
    product : []
}

const productSlice = createSlice({
    name: "Product",
    initialState: initialValue,
    reducers: {
        setAllCategory : (state, action) => {
            state.allCategory = [...action.payload]
        },
        setAllSubCategory : (state, action) => {
            state.allSubCategory = [...action.payload]
        }
    }
})

export const { setAllCategory, setAllSubCategory } = productSlice.actions

export default productSlice.reducer