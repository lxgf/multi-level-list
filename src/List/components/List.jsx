import React, { useState } from 'react';
import style from '../assets/styles/list.module.css';
import ListElement from "./ListElement";
import MaximizeIcon from '../assets/images/max.svg';

const List = props => {
    const [listData, setListData] = useState(props.listData);
    const [isMaximized, setMaxState] = useState(false)

    const check = async index => {
        let newListData = [...listData]
        newListData[index].isChecked = !listData[index].isChecked;
        await setListData(newListData)
    }

    const checkList = async index => {
        let newListData = [...listData]
        newListData[index].isChecked = !listData[index].isChecked;
        newListData[index].list.forEach((listDataItem, embeddedListIndex) => {
            if (listDataItem.list === false) {
                listDataItem.isChecked = !listDataItem.isChecked;
            } else {
                checkEmbeddedList(embeddedListIndex, index)
            }
        })
        await setListData(newListData)
    }

    if (listData.length === 0) {
        return <div className={style.info}>Нет данных</div>
    }
    return (
        <ul className={style.list}>
            {
                listData.map((listElement, index) => {
                    if (listElement.list === false) {
                        return (
                            <ListElement check={check} key={index} index={index} text={listElement.text} isChecked={listElement.isChecked}/>
                        )
                    } else {
                        return (
                            <li key={index} className={style.embeddedList}>
                                <div className={style.listHeader}>
                                    <img src={MaximizeIcon} className={style.arrow} alt="Maximize"
                                         onClick={(e) => {
                                             isMaximized ? setMaxState(false) : setMaxState(true)
                                             e.target.classList.toggle(style.rotate)
                                         }}
                                    />
                                    {listElement.text}
                                    <input onChange={() => checkList(index)} type="checkbox" checked={listElement.isChecked}/>
                                </div>
                                {isMaximized && <List listData={listElement.list}/>}
                            </li>
                        )
                    }
                })
            }
        </ul>
    );
};

export default List;
