import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './bootstrap';
// Сюда будет добавлен стор
// import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    ,
    document.getElementById('root'),
);