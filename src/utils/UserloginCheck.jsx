import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserloginCheck = () => {
    let auth;
    const getToken = localStorage.getItem('token')
  if(getToken !== null){
        auth = {isLogin:true}
    }else{
        auth = {isLogin:false}
    }
  return (
    auth.isLogin ? 
    <Navigate to={'/'}/>
    : 
    <Outlet/> 
  )
}

export default UserloginCheck