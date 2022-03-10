import React from 'react';
import style from '../assets/styles/list-element.module.css';

const ListElement = props => {
    return (
        <li className={style.element}>
            <span>{props.text}</span>
            <input type="checkbox" className={style.checkbox} checked={props.isChecked}
            onChange={() => props.check(props.index)}
            ><label/></input>
        </li>
    );
};

export default ListElement;