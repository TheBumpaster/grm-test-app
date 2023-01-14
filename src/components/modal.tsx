import {Col, Input, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useEffect, useMemo, useState} from "react";
import {getRandomInt} from "../redux/rank/helper";
import {resetScore, updateChecked} from "../redux/scoring";
import {incrementScoreByName} from "../redux/rank";

type RankModalProps = {
    open: boolean,
    setOpen: (value: boolean) => void,
}

export default function RankModal({ open, setOpen }: RankModalProps) {
    const dispatch = useDispatch();
    const scoreData = useSelector((state: RootState) => state.score)

    const [scoreKeys, setScoreKeys] = useState(Object.keys(scoreData))
    const [randomItemName, setRandomItemName] = useState<string | null>(scoreKeys[getRandomInt(0, scoreKeys.length - 1)])
    const [scoreLeftItems, setScoreLeftItems] = useState<Array<string> | null>(null)
    const [randomCheckedItem, setRandomCheckedItemName] = useState<string | null>(null)

    const [firstItemValue, setFirstItemValue] = useState(0)
    const [secondItemValue, setSecondItemValue] = useState(0)

    useMemo(() => {
        setScoreKeys(Object.keys(scoreData))
    }, [scoreData])

    useEffect(() => {
        setRandomItemName(scoreKeys[getRandomInt(0, scoreKeys.length - 1)])
    }, [scoreKeys])

    useEffect(() => {
        if (randomItemName !== null) {
            if (scoreData[randomItemName] !== undefined) {
                setScoreLeftItems([...scoreData[randomItemName].filter((value) => value.checked === false )].map(value => value.name))
            }
        }
    }, [scoreData, randomItemName])

    useEffect(() => {
        if (scoreLeftItems !== null) {
            setRandomCheckedItemName(scoreLeftItems[getRandomInt(0, scoreLeftItems.length - 1)])
        }
    }, [scoreLeftItems])

    const handleOk = () => {

        if (firstItemValue > secondItemValue) {
            dispatch(incrementScoreByName(randomItemName))
        } else if (secondItemValue > firstItemValue) {
            dispatch(incrementScoreByName(randomCheckedItem))
        } else {
            console.warn("Both items have same score")
        }

        dispatch(updateChecked({ name: randomItemName, checked: randomCheckedItem}))

    };

    const handleCancel = () => {
        dispatch(resetScore())
        setOpen(false);
    };

    return (
        <>
            <Modal
                title="Scoring"
                open={open}
                onOk={handleOk}
                okButtonProps={{disabled: scoreKeys.length === 0}}
                onCancel={handleCancel}
                cancelText={scoreKeys.length === 0 ? "Finish" : "Cancel"}
            >
                <p>
                    { scoreKeys.length > 0 &&
                        <>
                            <Row>
                                <Col span={12}>
                                    <Input addonBefore={randomItemName} suffix="point(s)" defaultValue="0" onChange={(e) => { setFirstItemValue(Number(e.target.value))} }/>
                                </Col>
                                <Col span={12}>
                                    <Input addonAfter={randomCheckedItem} suffix="point(s)" defaultValue="0"  onChange={(e) => { setSecondItemValue(Number(e.target.value))} }/>
                                </Col>
                            </Row>
                        </>
                    }

                    { scoreKeys.length === 0 &&
                        <>
                            You have rated every item with every item.
                        </>
                    }

                </p>
            </Modal>
        </>
    )
}