import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, checkPrev, checkFromPrev, isShowed, index}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState(false)
    const [indeterminateStatus, setIndeterminateStatus] = useState(false)
    const [checkedIndexes, setCheckIndexes] = useState([])
    const [checkLowStatus, setCheckLowStatus] = useState(false)

    const checkboxesCount = data.length

    useEffect(() => {
        const checkHigh = (checked, all) => {
            if (0 < checked < all) {
                setCheckedStatus(false)
                setIndeterminateStatus(true)

                typeof checkPrev === 'function' && checkPrev(false, index)
            }
            if (checked === 0) {
                setCheckedStatus(false)
                setIndeterminateStatus(false)

                typeof checkPrev === 'function' && checkPrev(false, index)
            }
            if (checked === all) {
                setCheckedStatus(true)
                setIndeterminateStatus(false)

                typeof checkPrev === 'function' && checkPrev(true, index)
            }
        }
        checkHigh(checkedIndexes.length, checkboxesCount)
    }, [checkedIndexes, checkboxesCount])

    useEffect(() => {
        const checkLow = status => {
            if (status) {
                setCheckedStatus(true)
                let newCheckedIndexes = []
                for (let index = 0; index < checkboxesCount; index++)
                    newCheckedIndexes.push(index)
                setCheckIndexes(newCheckedIndexes)
            }
            if (!status) {
                setCheckedStatus(false)
                setCheckIndexes([])
            }
        }

        checkLow(checkFromPrev)
        typeof checkFromPrev === "boolean" && setCheckLowStatus(checkFromPrev)
    }, [checkFromPrev])

    const check = (status, checkIndex) => {
        let newCheckedIndexes = [...checkedIndexes]

        if (status && !checkedIndexes.includes(checkIndex)) {
            newCheckedIndexes.push(checkIndex)
        } else if (!status && checkedIndexes.includes(checkIndex))
            newCheckedIndexes.splice(checkedIndexes.indexOf(checkIndex), 1)

        setCheckIndexes(newCheckedIndexes)
    }

    const listCheckboxHandle = () => {
        if (typeof checkPrev === 'function') {
            if (checkedStatus)
                checkPrev(false, index)
            else
                checkPrev(true, index)
        }
        if (checkedStatus) {
            setCheckIndexes([])

            setCheckedStatus(false)
            setIndeterminateStatus(false)

            setCheckLowStatus(false)
        } else {
            let newCheckedIndexes = []
            for (let index = 0; index < checkboxesCount; index++)
                newCheckedIndexes.push(index)
            setCheckIndexes(newCheckedIndexes)

            setCheckedStatus(true)
            setIndeterminateStatus(false)

            setCheckLowStatus(true)
        }
    }

    const showBtnHandle = e => {
        e.target.classList.toggle(listStyle.rotate)
        setShowStatus(!showStatus)
    }

    return (
        <ul style={{display: isShowed ? 'flex' : 'none' }} className={listStyle.list}>
            <div className={listStyle.list__header}>
                <input
                    type="checkbox"
                    checked={checkedStatus}
                    ref={el => {
                        el && (indeterminateStatus ? el.indeterminate = true : el.indeterminate = false)
                    }}
                    onChange={listCheckboxHandle}
                />
                <div>{title}</div>
                <img
                    className={listStyle.list__showBtn}
                    onClick={(e) => showBtnHandle(e)}
                    src={showBtn}
                    alt="Show"
                />
            </div>
            {
                data.map((dataItem, key) => {
                    if (dataItem.hasOwnProperty('childs'))
                        return <List
                            key={key}
                            index={key}
                            isShowed={showStatus}
                            checkFromPrev={typeof checkLowStatus ==='boolean' && checkLowStatus}
                            checkPrev={check}
                            title={dataItem.value}
                            data={dataItem.childs}
                        />
                    else
                        return <ListItem
                            key={key}
                            index={key}
                            isShowed={showStatus}
                            checkFromPrev={typeof checkLowStatus ==='boolean' && checkLowStatus}
                            checkPrev={check}
                            value={dataItem.value}
                        />
                })
            }
        </ul>
    );
};

export default List;
