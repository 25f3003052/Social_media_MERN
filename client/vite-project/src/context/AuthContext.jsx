import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosCalls/axios";

export const AuthContext = createContext()

// Public Pages ,  login ,  signup , landing   PublicRoutes


//Protected Pages ,  home , profile , chats , ProtectedRoutes


export const AuthProviders  = ({children})=>{

    const [user ,setUser] = useState(null)


    // whenever user logs in we need to verify users identity 

    useEffect(()=>{
        axiosInstance.get('/users/me').then((response)=>{
            console.log(response.data.userData)
            setUser(response.data.userData)
        }).catch((err)=>{
            console.log(err)
        })
    } , [])


    return (

        <AuthContext.Provider value={{user , setUser}}>

        {children}

        </AuthContext.Provider>
    )


}


export const useAuth = ()=>useContext(AuthContext)











