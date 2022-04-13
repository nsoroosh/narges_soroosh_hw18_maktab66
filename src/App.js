import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import React from 'react';
import { useState } from 'react';
export const user = React.createContext({});

function App() {
  const {context, setContext} = useState({})
  return (
    <>
    <user.Provider value={{context, setContext}}>
    <LoginForm/>
    <SignupForm/>
      </user.Provider>
    
    </>
    );
}

export default App;
