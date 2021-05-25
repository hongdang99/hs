import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

// tool
import {composeWithDevTools} from 'redux-devtools-extension';

import allReducers from './reducers/allReducers';
import App2 from "./App2";
import BasicExample from "./route/example";

// Store
let store = createStore(allReducers, composeWithDevTools());
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
          <div>
              {/*<App />*/}
              {/*<App2 />*/}
              <BasicExample/>
          </div>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
