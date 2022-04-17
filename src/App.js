import './App.css';
import React from 'react';
import Tabs from './components/Tabs';
import Hoc from './components/Hoc';
function App({name, handleLogOut}) {
  return (
    <>
    <div className="App">
        <div className="helloUser">
          <h1>سلام {name}</h1>
          <button onClick={handleLogOut}>خروج از حساب</button>
        </div>
      </div>
    
    
    </>
    );
}

export default Hoc( App);
