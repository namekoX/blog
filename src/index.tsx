import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
