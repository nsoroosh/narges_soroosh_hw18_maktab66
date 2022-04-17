import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoggedInUserContextProvider from './contexts/Usercontext';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInUserContextProvider>
      <App />
    </LoggedInUserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
