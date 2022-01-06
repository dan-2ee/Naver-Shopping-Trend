import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "./routes/Main";
import { Provider } from 'react-redux';
import {createStore} from "redux";
// import reducers from "./components/reducers";

import reducers from "./components/reducers";
const store = createStore(reducers, composeWithDevTools()); // 스토어를 만듭니다.

function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}/>
            </Routes>
        </BrowserRouter>
      </Provider>
    )
}

export default App;
