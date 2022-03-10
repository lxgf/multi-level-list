import React, {useEffect, useState} from 'react';
import style from '../assets/styles/list.module.css';
import ListElement from "./ListElement";
import EmbeddedList from "./EmbeddedList";

const List = props => {
    const [listData, setListData] = useState(props.listData);

    const assignIds = (listData, generalCounter) => {
        if (typeof generalCounter === 'undefined') {
            let counter = 0
            listData.forEach(listElem => {
                listElem.id = counter
                if (listElem.list !== false) {
                    assignIds(listElem.list, counter)
                }
                counter++
            })
        } else {
            let counter = 0
            listData.forEach(listElem => {
                listElem.id = generalCounter + '-' + counter
                if (listElem.list !== false) {
                    assignIds(listElem.list, generalCounter + '-' + counter)
                }
                counter++
            })
        }

        return listData
    }

    useEffect(() => {
        setListData(assignIds(listData))
    }, []);

    // меняем состояние чекбокса на обычном элементе
    const check = async index => {
        console.log(index)
        let newListData = [...listData]
        if (newListData[index].isChecked === 0)
            newListData[index].isChecked = 1
        else
            newListData[index].isChecked = 0
        await setListData(newListData)
    }

    // меняем состояние чекбокса на элементе-списке и состояния всех вложенные чекбоксов
    const checkList = async index => {
        console.log(index)
        let newListData = [...listData]
        switch (newListData[index].isChecked) {
            case 0:
                newListData[index].isChecked = 1
                if (newListData[index].list !== false) {
                    checkEmbeddedLists(newListData[index].list, 1)
                }
                break
            case 1:
                newListData[index].isChecked = 0
                if (newListData[index].list !== false) {
                    checkEmbeddedLists(newListData[index].list, 0)
                }
                break
            case 2:
                newListData[index].isChecked = 1
                if (newListData[index].list !== false) {
                    checkEmbeddedLists(newListData[index].list, 1)
                }
                break
            default:
                console.warn('Incorrect checked status!')
                break
        }
        await setListData(newListData)
    }

    // функция задачи значене чекбоксам во вложенном списке
    const checkEmbeddedLists = (list, checkedVal) => {
        list.forEach((listElem, elemIndex) => {
            listElem.isChecked = checkedVal
            if (listElem.list !== false)
                checkEmbeddedLists(listElem.list, checkedVal)
        })
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
                            <ListElement
                                check={check}
                                key={index}
                                index={index}
                                id={listElement.id}
                                text={listElement.text}
                                isChecked={listElement.isChecked}
                            />
                        )
                    } else {
                        return (
                            <EmbeddedList
                                check={check}
                                checkList={checkList}
                                index={index}
                                key={index}
                                id={listElement.id}
                                text={listElement.text}
                                isChecked={listElement.isChecked}
                                list={listElement.list}
                            />
                        )
                    }
                })
            }
        </ul>
    );
};

export default List;
