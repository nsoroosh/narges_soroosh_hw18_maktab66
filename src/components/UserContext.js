import { useState  , createContext} from 'react';
import React, { Children } from 'react'
export const UserContext = React.createContext();
 const Authentication = ({Children}) =>{
    const [info, setinfo] = useState(null)
  return (
    <UserContext.Provider value={{info, setinfo}}>
        {Children}
      </UserContext.Provider>
  )
}
export default Authentication