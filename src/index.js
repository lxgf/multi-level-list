import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from "./List/components/Main";
import data from './List/data/data.json'

ReactDOM.render(
  <React.StrictMode>
      <Main data={data} />
  </React.StrictMode>,
  document.getElementById('root')
);