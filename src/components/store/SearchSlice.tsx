import { createSlice } from '@reduxjs/toolkit'

const SearchSlice = createSlice({
    name: "reducers",
    initialState: {
        list: []
    },
    reducers: {
        addToList(state, action) {
            state.list = action.payload
        }
    }
})

export const searchAction = SearchSlice.actions
export const searchReducer = SearchSlice.reducer
