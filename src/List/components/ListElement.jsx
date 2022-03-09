import React from 'react';
import style from '../assets/styles/list-element.module.css';

const ListElement = props => {
    return (
        <li className={style.element}>
            <span>{props.text}</span>
            <input type="checkbox" checked={props.isChecked}
            onChange={() => props.check(props.index)}
            />
        </li>
    );
};

export default ListElement;
