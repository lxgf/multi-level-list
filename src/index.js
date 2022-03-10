import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from "./List/components/List";

const listData = [
    {
        text: 'Some text',
        isChecked: 0,
        list: false
    },
    {
        text: 'Some text',
        isChecked: 0,
        list: false
    },
    {
        text: 'Some list',
        isChecked: 2,
        list: [
            {
                text: 'Some list',
                isChecked: 1,
                list: [
                    {
                        text: 'Some text',
                        isChecked: 1,
                        list: false
                    },
                ]
            },
            {
                text: 'Some list',
                isChecked: 1,
                list: [
                    {
                        text: 'Some text',
                        isChecked: 1,
                        list: false
                    },
                    {
                        text: 'Some text',
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