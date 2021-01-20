import React from 'react';
import ReactDOM from 'react-dom';

// NOTE import redux thunk
import Thunk from 'redux-thunk'

import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';

// NOTE import untuk redux
// NOTE storage  pasti di redux
// NOTE import applymiddleware kalau mau pakai redux thunk
import { createStore, applyMiddleware } from 'redux'

// NOTE penyambung
import { Provider } from 'react-redux'

import allReducer from './reducers'

let globalState= createStore(allReducer, applyMiddleware(Thunk))
globalState.subscribe(() => console.log("Global State : ", globalState.getState()))

ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root')
)

