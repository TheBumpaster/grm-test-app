import {useDispatch} from "react-redux";
import {resetScore} from "../redux/rank";
import RankTable from "../components/rank-table";
import {Button} from "antd";
import {useState} from "react";
import RankModal from "../components/modal";

export default function App() {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const dispatch = useDispatch()

    return (
        <>
            <Button type={"primary"} onClick={() => showModal()}>Update Rank</Button>
            <Button style={{ marginLeft: "5px"}} danger type={"primary"} onClick={() => dispatch(resetScore())}>Reset Score</Button>

            <br />
            <br />

            <RankTable />

            <RankModal
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}