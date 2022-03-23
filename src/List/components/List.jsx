import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, isShowed, path, checkInParent}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState({
        isChecked: false,
        isIndeterminate: false
    })
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
            setCheckedStatus({isChecked: false, isIndeterminate: true})
        }
        if (checkedCount === 0) {
            setCheckedStatus({isChecked: false, isIndeterminate: false})
        }
        if (checkedCount === checkboxesCount) {
            setCheckedStatus({isChecked: true, isIndeterminate: false})
        }
    }, [checkboxesCount, checkedIndexes])

    const showBtnHandle = e => {
        e.target.classList.toggle(listStyle.rotate)
        setShowStatus(!showStatus)
    }

    const checkFromLow = (status, path) => {
        console.log(status, path)
        let newCheckedIndexes = [...checkedIndexes]

        if (status)
            newCheckedIndexes.push(path)
        else if (!status)
            newCheckedIndexes.splice(newCheckedIndexes.indexOf(path), 1)

        setCheckedIndexes(newCheckedIndexes)

        if (typeof checkInParent === 'function') {
            checkInParent(status, path)
            if (newCheckedIndexes.length === checkboxesCount)
                checkInParent(status, 'test')
        }
    }

    return (
        <ul style={{display: isShowed ? 'flex' : 'none' }} className={listStyle.list}>
            <div className={listStyle.header}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkedStatus.isChecked}
                        onChange={() => false}
                        ref={el => {
                            el && (checkedStatus.isIndeterminate ? el.indeterminate = true : el.indeterminate = false)
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
                            key={path+'-'+key}
                            path={path+'-'+key}
                            isShowed={showStatus}
                            title={dataItem.value}
                            data={dataItem.childs}
                            checkInParent={checkFromLow}
                        />
                    else
                        return <ListItem
                            key={path+'-'+key}
                            path={path+'-'+key}
                            isShowed={showStatus}
                            isChecked={checkedIndexes.includes(path+'-'+key)}
                            value={dataItem.value}
                            checkInParent={checkFromLow}
                        />
                })
            }
        </ul>
    );
};

export default List;
