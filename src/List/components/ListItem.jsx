import React, {useEffect, useState} from 'react';
import listItemStyle from '../assets/styles/listItem.module.css'

const ListItem = ({value, checkPrev, isShowed, checkFromPrev, index}) => {
    const [checkedStatus, setCheckedStatus] = useState(false)

    useEffect(() => {
        const checkLow = status => {
            if (typeof status === "boolean") {
                if (status) {
                    setCheckedStatus(true)
                }
                if (!status) {
                    setCheckedStatus(false)
                }
            }
        }
        checkLow(checkFromPrev)
    }, [checkFromPrev])

    const itemCheckboxHandle = () => {
        if (typeof checkPrev === 'function')
            if (checkedStatus) {
                setCheckedStatus(false)
                checkPrev(false, index)
            } else {
                setCheckedStatus(true)
                checkPrev(true, index)
            }
    }

    return (
        <li style={{display: isShowed ? 'flex' : 'none' }} className={listItemStyle.listItem}>
            <input
                type="checkbox"
                className={listItemStyle.listItem__checkbox}
                checked={checkedStatus}
                onChange={itemCheckboxHandle}
            />
            <div>{value}</div>
        </li>
    );
};

export default ListItem;
