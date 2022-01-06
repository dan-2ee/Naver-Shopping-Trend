import React from 'react';

export const ADD_TO_LIST = 'ADD_TO_LIST'

export const addToList = (item: any) => ({
    type: ADD_TO_LIST,
    item
})