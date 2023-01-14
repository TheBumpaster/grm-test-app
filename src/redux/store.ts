import {configureStore} from "@reduxjs/toolkit";
import rank from "./rank";
import score from "./scoring";

export const store = configureStore({
    reducer: {
        rank,
        score,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
