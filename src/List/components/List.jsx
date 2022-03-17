import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, checkPrev, checkFromPrev, isShowed, index, layer}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState(false)
    const [indeterminateStatus, setIndeterminateStatus] = useState(false)
    const [checkedIndexes, setCheckedIndexes] = useState([])
    const [checkLowStatus, setCheckLowStatus] = useState(false)


    const getCountElements = () => {
        let counter = 0;
        let test = (element) => {
            counter++;
            if (element.hasOwnProperty('childs')) {
                element.childs.forEach(test);
            }
        }
        data.forEach(test)
        return counter;
    }
    const checkboxesCount = getCountElements();


    useEffect(() => {
        const checkHigh = (checked, all) => {
            console.log("index" + ' = ' +index+ ' layer' + layer + " all = " + all + " checked = " + checked);
            console.log("_____________");
            if (0 < checked && checked < all) {
                setCheckedStatus(false)
                setIndeterminateStatus(true)

                console.log('????')
                typeof checkPrev === 'function' && checkPrev('indeterminate', index)
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
    }, [checkedIndexes])

    useEffect(() => {
        const checkLow = status => {
            if (typeof status === "boolean") {
                if (status) {
                    setCheckedStatus(true)
                    let newCheckedIndexes = []
                    let test = (element) =>{
                        newCheckedIndexes.push(element.index);
                        if (element.hasOwnProperty('childs')) {
                            element.childs.forEach(test);
                        }
                    }
                    data.forEach(test);
                    console.log(newCheckedIndexes);
                    // for (let index = 0; index < checkboxesCount; index++)
                    //     newCheckedIndexes.push(index)
                    setCheckedIndexes(newCheckedIndexes)
                }
                if (!status) {
                    setCheckedStatus(false)
                    setCheckedIndexes([])
                }
            }
        }

        checkLow(checkFromPrev)
        typeof checkFromPrev === "boolean" && setCheckLowStatus(checkFromPrev)
    }, [checkFromPrev, checkboxesCount])

    const check = (status, checkIndex) => {
        setCheckLowStatus(undefined)

        let newCheckedIndexes = [...checkedIndexes]

        if (typeof status === 'boolean'){
            console.log('boolean', status, checkedIndexes);
            if (status && !checkedIndexes.includes(checkIndex)) {
                newCheckedIndexes.push(checkIndex)
            } else if (!status && checkedIndexes.includes(checkIndex))
                newCheckedIndexes.splice(checkedIndexes.indexOf(checkIndex), 1)
        } else if (status === 'indeterminate') {
            setCheckedStatus(false)
            setIndeterminateStatus(true)
            !checkedIndexes.includes(checkIndex) && newCheckedIndexes.splice(checkedIndexes.indexOf(checkIndex), 1)
            checkedIndexes.includes(checkIndex) && newCheckedIndexes.push(checkIndex)
        }

        console.log('new array = '+newCheckedIndexes+' check = ' + checkIndex, status);
        setCheckedIndexes(newCheckedIndexes)

    }

    const listCheckboxHandle = () => {
        if (typeof checkPrev === 'function') {
            if (checkedStatus)
                checkPrev(false, index)
            else
                checkPrev(true, index)
        }
        if (checkedStatus) {
            setCheckedIndexes([])

            setCheckedStatus(false)
            setIndeterminateStatus(false)

            setCheckLowStatus(false)
        } else {
            let newCheckedIndexes = []
            let test = (element) => {
                newCheckedIndexes.push(element.index);
                if (element.hasOwnProperty('childs')) {
                    element.childs.forEach(test);
                }
            }
            data.forEach(test);
            console.log(newCheckedIndexes);
            setCheckedIndexes(newCheckedIndexes)

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
                            key={dataItem.index}
                            index={dataItem.index}
                            isShowed={true}
                            checkFromPrev={checkLowStatus}
                            checkPrev={check}
                            layer={layer + 1}
                            title={dataItem.value + " " + dataItem.index}
                            data={dataItem.childs}
                        />
                    else
                        return <ListItem
                            key={dataItem.index}
                            index={dataItem.index}
                            isShowed={true}
                            checkFromPrev={checkLowStatus}
                            checkPrev={check}
                            value={dataItem.value + " " + dataItem.index}
                        />
                })
            }
        </ul>
    );
};

export default List;
