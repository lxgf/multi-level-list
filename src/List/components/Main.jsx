import React from 'react';
import mainStyle from '../assets/styles/main.module.css'
import List from "./List";

const Main = ({data}) => {
    return (
        <div className={mainStyle.main}>
            <header className={mainStyle.header}>
                Multi-level List
            </header>
            <div className={mainStyle.listContainer}>
                <List
                    title={'Main list'}
                    data={data}
                    key={'0'}
                    index={'0'}
                    isShowed={true}
                />
            </div>
        </div>
    );
};

export default Main;
