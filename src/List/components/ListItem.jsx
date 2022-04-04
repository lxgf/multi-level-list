import React from 'react';
import listItemStyle from '../assets/styles/listItem.module.css'

const ListItem = ({value, isShowed, isChecked, path, checkInParent}) => {

    return (
        <li style={{display: isShowed ? 'flex' : 'none' }} className={listItemStyle.listItem}>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => checkInParent(!isChecked, [path])}
                />
                {value}
            </label>
        </li>
    );
};

export default ListItem;
