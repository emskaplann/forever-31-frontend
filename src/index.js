import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index.js';
import actionCreators from './actionCreators'
import * as serviceWorker from './serviceWorker';


const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

// getting first 10 product when initializing the page
fetch(`https://immense-garden-92266.herokuapp.com/products?limit=${parseInt(localStorage.limit) > 20 ? localStorage.limit : "31"}`)
.then(r => r.json())
.then(products => {
  store.dispatch(actionCreators.productActionCreator(products))
  ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));
})

// app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)
//
// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
