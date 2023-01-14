import {createSlice} from "@reduxjs/toolkit";
import rankData, {initializeRankData, saveRankData} from "../../data";

export interface RankState {
    score: number;
    name: string;
    position?: number;
    key?: string;
}

const initialState: Array<RankState> = rankData

export const rankSlice = createSlice({
    name: "rank",
    initialState,
    reducers: {
        incrementScoreByName: (state, action) => {
            state.forEach((item) => {
                if (item.name === action.payload) {
                    item.score += 1
                }
            })

            state.sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0)

            saveRankData(state)
        },
        resetScore: () => {
            return initializeRankData(true)
        }
    }
})

export const {incrementScoreByName, resetScore} = rankSlice.actions

export default rankSlice.reducer