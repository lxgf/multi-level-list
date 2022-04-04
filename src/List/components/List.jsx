import React, {useCallback, useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, isShowed, path, checkInParent}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState({
        isChecked: false,
        isIndeterminate: false
    })
    const [checkedPaths, setCheckedPaths] = useState([])
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
        const checkedCount = checkedPaths.length

        if (0 < checkedCount < checkboxesCount) {
            setCheckedStatus({isChecked: false, isIndeterminate: true})
        }
        if (checkedCount === 0) {
            setCheckedStatus({isChecked: false, isIndeterminate: false})
        }
        if (checkedCount === checkboxesCount+1) {
            setCheckedStatus({isChecked: true, isIndeterminate: false})
        }
    }, [checkboxesCount, checkedPaths])

    const showBtnHandle = e => {
        e.target.classList.toggle(listStyle.rotate)
        setShowStatus(!showStatus)
    }

    const checkFromLow = useCallback((status, path) => {
        let newCheckedPaths = [...checkedPaths]

        if (status) {
            newCheckedPaths.push(path)
        } else if (!status) {
            newCheckedPaths.splice(newCheckedPaths.indexOf(path), 1)
            let listIndex = path.split('-').slice(0, -1)
            listIndex = listIndex.join('-')
            if (newCheckedPaths.includes(listIndex))
                newCheckedPaths.splice(newCheckedPaths.indexOf(listIndex), 1)
        }

        setCheckedPaths(newCheckedPaths)

        if (typeof checkInParent === 'function') {
            checkInParent(status, path)
        }
    }, [checkInParent, checkedPaths])

    useEffect(() => {
        if (checkedPaths.length === checkboxesCount) {
            checkFromLow(true, path)
        }
    }, [checkFromLow, checkboxesCount, checkedPaths, path])

    const checkList = status => {
        console.log(status)
        if (status) {
            for (let i = 0; i < checkboxesCount; i++) {
                console.log(
                    path
                        .split('-')
                        .concat(i)
                        .join('-'))
            }
        }
    }

    return (
        <ul style={{display: isShowed ? 'flex' : 'none' }} className={listStyle.list}>
            <div className={listStyle.header}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkedStatus.isChecked}
                        onChange={() => checkList(!checkedStatus.isChecked)}
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
                            isChecked={checkedPaths.includes(path+'-'+key)}
                            value={dataItem.value}
                            checkInParent={checkFromLow}
                        />
                })
            }
        </ul>
    );
};

export default List;
