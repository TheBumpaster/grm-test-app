import {Table} from "antd";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {RankState} from "../redux/rank";

const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
    }
]

export default function RankTable() {
    const rankState = useSelector((state: RootState) => state.rank)
    const [rank, setRank] = useState(rankState)

    useMemo(() => {
        let rank: Array<RankState> = [];
        rankState.forEach((item, index) => {
            rank.push({...item, position: index + 1, key: `rank-position-key-${index}`})
        })
        setRank(rank)
    }, [rankState])
    return (
        <Table columns={columns} dataSource={rank} />
    )
}