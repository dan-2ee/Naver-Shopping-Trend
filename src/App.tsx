import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "./routes/Main";
import Search from "./components/Search";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main />}/>
              {/*<Route path="/search" element={<Search />}/>*/}
          </Routes>
      </BrowserRouter>
  )

}


export default App;
