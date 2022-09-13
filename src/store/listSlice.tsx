import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuoteType } from "../utils/types";

type initialStateType = {
    value: QuoteType[]
}

const initialState:initialStateType = {
    value: [],
}

const quotestSlice = createSlice ({
    name: 'quotestList',
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state)
        },
        decrement: (state) => {
            console.log(state)
        },
        updateList: (state: initialStateType, action:PayloadAction<QuoteType>) => {
            console.log({ state })
            console.log({ action })
            
            /* eslint-disable */
            //@ts-ignore
            state.value = action.payload
            
        }
    }
});

export const { increment, decrement, updateList } = quotestSlice.actions

export default quotestSlice.reducer;