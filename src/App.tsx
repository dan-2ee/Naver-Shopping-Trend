import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Main from "./routes/Main";
import Search from "./components/Search";

function App() {
  const onSubmit = (form: {
    category: string,
    keyword: string,
    }) => {
    console.log(form);
  };
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main onSubmit={onSubmit}/>} />
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
      /*<Main onSubmit={onSubmit}/>
      *  <Route path="/search" element={<Search/>} />*/
  )

}


export default App;
