import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Toaster, toast } from "sonner";
import axios from 'axios'
const MenuProfile = () => {
  const [success,setSuccess] = useState(false)
  const logOut = (e)=>{
  const getToken = JSON.parse(localStorage.getItem('token')) 
    e.preventDefault()
    axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
    { 
    headers:{
      apiKey:'24405e01-fbc1-45a5-9f5a-be13afcd757c',
      Authorization:`Bearer ${getToken}`
    }
  }).then((res)=>{
    console.log(res)
    toast.success(`${res.data.message}`)
    setTimeout(()=>{
      setSuccess(false)
    },1800)
    localStorage.removeItem('token')
    setSuccess(true)
    window.location.reload()
  }).catch((err)=>{
    console.log(err)
    toast.error('Logout failed')
  }).finally(()=>{
    
  })
    
  }
  const isOpen = useSelector((state)=>state.feature.isOpen)
  if(success === true){
    return(
      <>
      <div className='z-20 bg-gray-500/40 fixed right-0 top-0 bottom-0 left-0  w-svw h-svh'>
     
      <Toaster position="top-center" richColors />
   
    </div>
      </>
    )
  }else{

  
  return (
    <>
    <div className={`absolute z-10 rounded-md gap-4 top-20 right-8 mt h-fit p-2 grid bg-black text-white  ${isOpen !== true ? 'hidden': 'block'}`}>
     <div className='flex gap-2 items-center'>
     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
      <a href='/profile'> Profile</a>
     </div>
     <div className='flex gap-2 items-center'>
     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#fff" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
     <button onClick={logOut} >LogOut</button>
     </div>
    </div>
    </>
  )
}
}

export default MenuProfile