import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from "./List/components/List";

const listData = [
    {
        text: 'Some text 0',
        isChecked: 0,
        list: false
    },
    {
        text: 'Some text 1',
        isChecked: 0,
        list: false
    },
    {
        text: 'Some list 1',
        isChecked: 2,
        list: [
            {
                text: 'Some list 2',
                isChecked: 1,
                list: [
                    {
                        text: 'Some text 3',
                        isChecked: 1,
                        list: false
                    },
                ]
            },
            {
                text: 'Some list 3',
                isChecked: 1,
                list: [
                    {
                        text: 'Some text 4',
                        isChecked: 1,
                        list: false
                    },
                    {
                        text: 'Some text 5',
                        isChecked: 0,
                        list: false
                    },
                ]
            },
        ]
    },
]

ReactDOM.render(
  <React.StrictMode>
      <div className="app">
          <List listData={listData}/>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);