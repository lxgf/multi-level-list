import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, checkPrev, checkedIndexesPrev, index}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState(false)
    const [indeterminateStatus, setIndeterminateStatus] = useState(false)
    const [checkedIndexes, setCheckIndexes] = useState([])

    const checkboxesCount = data.length
    const [checkedCount, setCheckedCount] = useState(0)

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
        checkHigh(checkedCount, checkboxesCount)
    }, [checkedCount, checkboxesCount])


    useEffect(() => {
        if (typeof checkedIndexesPrev !== 'undefined') {
            console.log(checkedIndexesPrev)
            if (checkedIndexesPrev === -1)
                setCheckedStatus(false)
            if (checkedIndexesPrev !== -1)
                setCheckedStatus(true)
        }
    }, [checkedIndexesPrev])

    const check = (status, checkIndex) => {

        let newCheckedIndexes = [...checkedIndexes]

        if (status && checkedIndexes.indexOf(checkIndex) === -1) {
            setCheckedCount(checkedCount + 1)
            newCheckedIndexes.push(checkIndex)
        } else if (!status && checkedIndexes.indexOf(checkIndex) !== -1 ) {
            setCheckedCount(checkedCount - 1)
            newCheckedIndexes.splice(checkedIndexes.indexOf(checkIndex), 1)
        }

        setCheckIndexes(newCheckedIndexes)
    }

    return (
        <ul className={listStyle.list}>
            <div className={listStyle.list__header}>
                <input
                    type="checkbox"
                    checked={checkedStatus}
                    ref={el => {
                        el && (indeterminateStatus ? el.indeterminate = true : el.indeterminate = false)
                    }}
                    onChange={async () => {
                        if (typeof checkPrev === 'function')
                            if (checkedStatus) {
                                setCheckedStatus(false)
                                setIndeterminateStatus(false)
                                checkPrev(false, index)
                            } else {
                                setCheckedStatus(true)
                                setIndeterminateStatus(false)
                                checkPrev(true, index)
                            }
                        else {
                            setCheckedStatus(!checkedStatus)
                        }
                    }}
                />
                <div>{title}</div>
                <img
                    className={listStyle.list__showBtn}
                    onClick={e => {
                        e.target.classList.toggle(listStyle.rotate)
                        setShowStatus(!showStatus)
                    }}
                    src={showBtn}
                    alt="Show"
                />
            </div>
            {
                showStatus && data.map((dataItem, key) => {
                    if (dataItem.hasOwnProperty('childs'))
                        return <List key={key} index={key} checkPrev={check} checkedIndexesPrev={checkedIndexes.indexOf(key)} title={dataItem.value} data={dataItem.childs} />
                    else
                        return <ListItem key={key} index={key} checkPrev={check} checkedIndexesPrev={checkedIndexes.indexOf(key)} value={dataItem.value} />
                })
            }
        </ul>
    );
};

export default List;
