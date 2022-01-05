import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "./routes/Main";
import { Provider } from 'react-redux';
import {createStore} from "redux";


function App() {
    // const store = createStore(reducer);
  return (
      // <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />}/>
          </Routes>
      </BrowserRouter>
      // </Provider>
  )
}

export default App;
