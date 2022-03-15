import React, {useEffect, useState} from 'react';
import listItemStyle from '../assets/styles/listItem.module.css'

const ListItem = ({value, checkPrev, checkedIndexesPrev, index}) => {
    const [checkedStatus, setCheckedStatus] = useState(false)

    useEffect(() => {
        if (typeof checkedIndexesPrev !== 'undefined') {
            if (checkedIndexesPrev === -1)
                setCheckedStatus(false)
            if (checkedIndexesPrev !== -1)
                setCheckedStatus(true)
        }
    }, [checkedIndexesPrev])

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
                            checkPrev(false, index)
                        } else {
                            setCheckedStatus(true)
                            checkPrev(true, index)
                        }
                    }
                }
            />
            <div>{value}</div>
        </li>
    );
};

export default ListItem;
