import React, {useState} from 'react';
import listItemStyle from '../assets/styles/listItem.module.css'

const ListItem = ({value, checkPrev}) => {
    const [checkedStatus, setCheckedStatus] = useState(false)

    return (
        <li className={listItemStyle.listItem}>
            <input
                type="checkbox"
                className={listItemStyle.listItem__checkbox}
                checked={checkedStatus}
                onChange={() => {
                    if (typeof checkPrev !== 'undefined')
                        if (checkedStatus) {
                            setCheckedStatus(false)
                            checkPrev(false)
                        } else {
                            setCheckedStatus(true)
                            checkPrev(true)
                        }
                }}
            />
            <div>{value}</div>
        </li>
    );
};

export default ListItem;
