import React from 'react'
import { Navigate } from 'react-router'

const PriveteRouter = (user,children) => {
 if(!user.isConnected){
  return <Navigate to="/auth/login" replace/>
 }
 return children
}

export default PriveteRouter
