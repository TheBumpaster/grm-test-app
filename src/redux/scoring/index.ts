import {createSlice} from "@reduxjs/toolkit";
import {generateDefaultScoreState} from "../rank/helper";

export type ScoreState = {
    [key: string]: Array<{ name: string, checked: boolean }>
}

export const initialState: ScoreState = generateDefaultScoreState()

const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        resetScore: () => {
            return generateDefaultScoreState()
        },
        updateChecked: (state, action) => {
            state[action.payload.name].forEach((item) => {
                if (item.name === action.payload.checked) {
                    item.checked = true;
                }
            })
            const checked: { [key: string]: boolean } = {};

            Object.keys(state).forEach((key: string) => {
                checked[key] = Object.values(state[key]).every( item => item.checked === true )
            })

            Object.keys(checked).forEach((key: string) => {
                if (checked[key]) {
                    delete state[key]
                }

            })
        }
    }
})

export const { resetScore, updateChecked } = scoreSlice.actions;

export default scoreSlice.reducer