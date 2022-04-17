import React from 'react'
import App from '../App'
import { UserContext } from './UserContext'
import { useCallback,useContext } from 'react'
import Tabs from './Tabs'

const Hoc = Component => {
  return function HocComponent({...props}) {
      const {info ,setinfo} = useContext(UserContext)
      const handleLogOut = useCallback(() => setinfo(null))

      return (
          <>  
              {info === null ? <Tabs /> : 
                  <Component 
                      name={info.name} 
                      handleLogOut={handleLogOut}
                      {...props}/>}
          </>
      ) 
  }
}

export default Hoc