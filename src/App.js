import React from "react";
import WithCheckingLogin from "./components/HOC/Hoc";
import './App.css'

function App({name, handleLogOut}) {
    return (
      <div className="App">
        <div className="helloUser">
          <h1>سلام {name}</h1>
          <button onClick={handleLogOut}>خروج از حساب</button>
        </div>
      </div>
    )
}

export default WithCheckingLogin(App);
