import { createSlice } from '@reduxjs/toolkit'

const SearchSlice = createSlice({
    name: "reducers",
    initialState: {
        list: []
    },
    reducers: {
        // addToList: action type 문자열
        // 해당 함수는 해당 액션이 dispatch될 때 실행될 reducer
        addToList(state, action) {
            state.list.concat(action.payload.item)
        }
    }
})


export default SearchSlice.reducer