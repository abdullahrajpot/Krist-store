import React, { createContext, useContext, useReducer } from 'react'

const Auth = createContext()
const initialstate = {isAuthenticated:false , user : {}}
const reducer =(state , {type , payload})=>{
switch (type) {
    case" SET_LOGGED_IN":
        return {isAuthenticated:true , user:payload.user}
    case "SET_UPDATE_PROFILE":
        return {...state , ...payload}
    case "SET_LOGGED_OUT":
        return {initialstate}
    default:
        return state;
}
}



export default function AuthContextProvider({children}) {

    const [state , dispatch] = useReducer(reducer , initialstate) 
  return (
    <Auth.Provider value={{...state , dispatch}}>
{children}
    </Auth.Provider>
      
    
  )
}

export const useAuthContext =() => useContext(Auth)
