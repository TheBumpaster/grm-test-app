import {initializeRankData} from "../../data";
import {ScoreState} from "../scoring";

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateDefaultScoreState = () => {
    const data = initializeRankData(false);
    const state: ScoreState = {};

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i].name !== data[j].name) {
                if (state[data[i].name] === undefined) {
                    state[data[i].name] = []
                }
                state[data[i].name].push({ name: data[j].name, checked: false })
            }
        }
    }

    return state;
}