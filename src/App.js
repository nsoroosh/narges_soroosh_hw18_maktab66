import React from "react";
import './App.css'
import HomePage from "./components/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import InformationPage from "./components/InformationPage";
import NextInformationPage from "./components/NextInformationPage";
function App({name, handleLogOut}) {
    return (
      <Routes>
        <Route path="/" element={<App />} />
           <Route index element={<HomePage/>}/>
           <Route path=":informations" element={<InformationPage/>}/>
           <Route path=":nextinformation" element={<NextInformationPage/>}/>
      </Routes>
    )
}

export default App;
