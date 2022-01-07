import React from 'react';
import {ADD_TO_LIST} from "./Action";

const initialState = {
    list: [],
}

function reducers(state: {list: never[]} | undefined = initialState, action: { type: any; item: any; }) {
        switch (action.type) {
            case ADD_TO_LIST:
                return {
                    // ...state,
                    // list: state.list.concat(action.item)
                    list: action.item
                }
            default:
                return state
        }
}

export default reducers