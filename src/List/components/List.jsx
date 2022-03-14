import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import listStyle from '../assets/styles/list.module.css'
import showBtn from '../assets/images/showBtn.svg'

const List = ({title, data, checkPrev}) => {
    const [showStatus, setShowStatus] = useState(false)
    const [checkedStatus, setCheckedStatus] = useState(false)
    const [indeterminateStatus, setIndeterminateStatus] = useState(false)

    const checkboxesCount = data.length
    const [checkedCount, setCheckedCount] = useState(0)

    useEffect(() => {
        const checkHigh = () => {
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
        }
        checkHigh()
    }, [checkboxesCount, checkedCount])

    const check = status => {
        if (status) {
            setCheckedCount(checkedCount + 1)
        } else if (!status) {
            setCheckedCount(checkedCount - 1)
        }
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
                    onChange={() => {
                        if (typeof checkPrev !== 'undefined')
                            if (checkedStatus) {
                                setCheckedStatus(false)
                                checkPrev(false)
                            } else {
                                setCheckedStatus(true)
                                checkPrev(true)
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
                        return <List key={key} checkPrev={check} title={dataItem.value} data={dataItem.childs} />
                    else
                        return <ListItem key={key} checkPrev={check} value={dataItem.value} />
                })
            }
        </ul>
    );
};

export default List;
