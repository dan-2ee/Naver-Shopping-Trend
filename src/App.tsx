import React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {SearchSlice} from "./components/SearchSlice";
import reducers from "./components/reducers";
// const store = createStore(SearchSlice.reducer, composeWithDevTools());

const store = createStore(reducers, composeWithDevTools());
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
