import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, isShowed, index, checkParent}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [indeterminateStatus, setIndeterminateStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState(false)
    const [checkedIndexes, setCheckedIndexes] = useState([])
    const [checkboxesCount, setCheckboxesCount] = useState()

    useEffect(() => {
        const countCheckboxes = data => {
            let checkboxesCount = 0
            data.forEach(dataItem => {
                if (dataItem.hasOwnProperty('childs'))
                    checkboxesCount += countCheckboxes(dataItem.childs)
                checkboxesCount++
            })
            return checkboxesCount
        }
        setCheckboxesCount(countCheckboxes(data))
    }, [data])

    useEffect(() => {
        const checkedCount = checkedIndexes.length

        if (0 < checkedCount < checkboxesCount) {
            setCheckedStatus(false)
            setIndeterminateStatus(true)
        }
        if (checkedCount === 0) {
            setCheckedStatus(false)
            setIndeterminateStatus(false)
        }
        if (checkedCount === checkboxesCount) {
            setCheckedStatus(true)
            setIndeterminateStatus(false)
        }

        typeof checkParent === 'function' && checkParent([...checkedIndexes])
    }, [checkedIndexes, data.length])

    const showBtnHandle = e => {
        e.target.classList.toggle(listStyle.rotate)
        setShowStatus(!showStatus)
    }

    const checkFromLow = indexes => {
        indexes.forEach(index => {
            let newCheckedIndexes = [...checkedIndexes]
            if (newCheckedIndexes.includes(index))
                newCheckedIndexes.splice(newCheckedIndexes.indexOf(index), 1)
            else if (!newCheckedIndexes.includes(index))
                newCheckedIndexes.push(index)
            setCheckedIndexes(newCheckedIndexes)
        })
    }

    return (
        <ul style={{display: isShowed ? 'flex' : 'none' }} className={listStyle.list}>
            <div className={listStyle.header}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkedStatus}
                        ref={el => {
                            el && (indeterminateStatus ? el.indeterminate = true : el.indeterminate = false)
                        }}
                    />
                    {title}
                </label>
                <img
                    className={listStyle.showBtn}
                    onClick={(e) => showBtnHandle(e)}
                    src={showBtn}
                    alt="Show"
                />
            </div>
            {
                data.map((dataItem, key) => {
                    if (dataItem.hasOwnProperty('childs'))
                        return <List
                            key={index+'-'+key}
                            index={index+'-'+key}
                            isShowed={showStatus}
                            title={dataItem.value}
                            data={dataItem.childs}
                            checkParent={checkFromLow}
                        />
                    else
                        return <ListItem
                            key={index+'-'+key}
                            index={index+'-'+key}
                            isShowed={showStatus}
                            isChecked={checkedIndexes.includes(index+'-'+key)}
                            value={dataItem.value}
                            checkParent={checkFromLow}
                        />
                })
            }
        </ul>
    );
};

export default List;
