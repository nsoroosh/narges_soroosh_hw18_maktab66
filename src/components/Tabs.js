// import React from 'react'

import React, { useState } from 'react';
import LoginForm from './Login';
import SignupForm from './SignupForm';
import "./Tab.css"
import  Authentication  from './UserContext';

export default function Tabs() {
  const [login, setLogin] = useState(true)
  return(
    <div className='App'>
  <div className='Forms'>
      <div className='Forms-btns'>
          <button 
              className={`F-btn ${login ? 'activeBtn' : ''}`}
              onClick={() => setLogin(!login)}>ورود
          </button>
          <button 
              className={`F-btn ${login ? '' : 'activeBtn'}`}
              onClick={() => setLogin(!login)}>ثبت نام
          </button>
      </div>
      {login ? <SignupForm /> : <LoginForm />}
  </div>
</div>
  )
  
}
