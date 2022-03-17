import React from 'react';
import mainStyle from '../assets/styles/main.module.css'
import List from "./List";

const Main = ({data}) => {
    return (
        <div className={mainStyle.main}>
            <header className={mainStyle.main__header}>
                Multi-level List
            </header>
            <div className={mainStyle.listContainer}>
                <List
                    title={'Main list'}
                    data={data}
                    index={0}
                    layer={0}
                    isShowed={true}
                />
            </div>
        </div>
    );
};

export default Main;
