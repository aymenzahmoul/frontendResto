import React from 'react'
import { Navigate } from 'react-router'

const AdminRouter = (user,children) => {
    if(!user.isConnected){
        return <Navigate to="/auth/login" replace/>
       }else
       if(user.role !== "ADMIN"){
        return <Navigate to="/noaccess" replace/> 
      }
       return children
      }


export default AdminRouter
