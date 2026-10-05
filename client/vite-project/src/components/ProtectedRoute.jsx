import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const {user} = useAuth()

    console.log(user)



    if(!user){
        // .. move the user to home page 
        return <Navigate to={'/login'}/>
     }



  return children
}

export default ProtectedRoute



