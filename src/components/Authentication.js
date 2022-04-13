import { useState } from 'react';
import React, { Children } from 'react'
 export const user = React.createContext({});

 const Authentication = (Children) => {
    const {context, setContext} = useState({})
  return (
    <user.Provider value={{context, setContext}}>
        {Children}
      </user.Provider>
  )
}

export default Authentication