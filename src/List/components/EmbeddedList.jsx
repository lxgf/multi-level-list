import React, {useState} from 'react';
import style from "../assets/styles/list.module.css";
import MaximizeIcon from "../assets/images/max.svg";
import ListElement from "./ListElement";

const EmbeddedList = props => {
    const [isMaximized, setMaxState] = useState(false)

    return (
        <li key={props.index} className={style.embeddedList}>
            <div className={style.listHeader}>
                <img src={MaximizeIcon} className={style.arrow} alt="Maximize"
                     onClick={(e) => {
                         isMaximized ? setMaxState(false) : setMaxState(true)
                         e.target.classList.toggle(style.rotate)
                     }}
                />
                {props.text}
                <input
                    onChange={() => props.checkList(props.index)}
                    type="checkbox"
                    checked={props.isChecked}
                    ref={el => {
                        el && (props.isChecked === 2 ? el.indeterminate = true : el.indeterminate = false)
                    }}
                />
            </div>
            <ul className={style.list}>
                {isMaximized &&
                    props.list.map((listElement, index) => {
                        if (listElement.list === false) {
                            return (
                                <ListElement
                                    check={props.check}
                                    key={index}
                                    index={index}
                                    text={listElement.text}
                                    isChecked={listElement.isChecked}
                                />
                            )
                        } else {
                            return (
                                <EmbeddedList
                                    check={props.check}
                                    checkList={props.checkList}
                                    key={index}
                                    index={index}
                                    text={listElement.text}
                                    isChecked={listElement.isChecked}
                                    list={listElement.list}
                                />
                            )
                        }
                    })
                }
            </ul>
        </li>
    );
};

export default EmbeddedList;
