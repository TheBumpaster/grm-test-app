import {RankState} from "../redux/rank";

export const initializeRankData = (clean: boolean): Array<RankState> => {
    let rankData: Array<RankState> = [];

    if (clean) {
        for (let i = 1; i <= 6; i++) {
            rankData.push(
                {
                    name: `Item${i}`,
                    score: 0,
                }
            )
        }
        localStorage.setItem("rank", JSON.stringify(rankData))
    } else {
        if (localStorage.getItem("rank") === null) {
            return initializeRankData(true)
        } else {
            rankData = JSON.parse(localStorage.getItem("rank") as string) as Array<RankState>
        }
    }

    return rankData;
}

export const saveRankData = (rank: Array<RankState>) => {
    localStorage.setItem("rank", JSON.stringify(rank))
}

export default initializeRankData(false)