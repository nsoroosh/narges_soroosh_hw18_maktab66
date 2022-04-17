import { createContext , useState} from "react";

export const LoggedInUserContext = new createContext()

const LoggedInUserContextProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    
    return (
        <LoggedInUserContext.Provider value={{loggedInUser ,setLoggedInUser}}>
            {children}
        </LoggedInUserContext.Provider>
    )
}

export default LoggedInUserContextProvider