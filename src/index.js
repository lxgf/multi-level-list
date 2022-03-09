import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from "./List/components/List";

const listData = [
    {
        text: 'Some text',
        isChecked: false,
        list: false
    },
    {
        text: 'Some text',
        isChecked: false,
        list: false
    },
    {
        text: 'Some list',
        isChecked: true,
        list: [
            {
                text: 'Some list',
                isChecked: true,
                list: [
                    {
                        text: 'Some text',
                        isChecked: true,
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