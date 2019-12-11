import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer.js';
import actionCreators from './actionCreators'
import * as serviceWorker from './serviceWorker';


const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

// getting first 10 product when initializing the page
fetch('http://localhost:3000/products?limit=10')
.then(r => r.json())
.then(products => {
  store.dispatch(actionCreators.productActionCreator(products))

  ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
