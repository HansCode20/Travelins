import React, { useEffect, useState } from 'react'
import  SideBarList from '../Routes/routeDashboard'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiSolidRightArrow } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";
import { isPending } from '@reduxjs/toolkit';
const Sidebar = () => {
   const navigate= useNavigate()
   
    const [isOpen,setIsOpen] = useState(false)  
    return(
        <>
        {/* Wider screen (Desktop) */}
            <div className='  md:sticky md:flex h-screen top-0 items-start'>
                <nav  className=' h-screen'>
            <div className={`hidden  md:grid p-4 w-fit  bg-white  z-10  top-0 pt-6 h-svh gap-4 border-r-2 border-gray-800 `}>
                <div className=' grid   gap-6'>
                    <div className=' flex gap-6 items-center'>
                    {isOpen == true &&<h1 className='font-semibold text-2xl'>Dashboard</h1>}
                <button className={``} onClick={()=>setIsOpen(!isOpen)}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg></button>
                    </div>
            {SideBarList.map((list,index)=>(
                <NavLink to={list.path} key={index}className={({isActive})=> isActive
                ? 'flex gap-3 text-slate-900 bg-gray-400 px-2 rounded-lg items-center ' 
                : 'flex gap-3 items-center px-2 text-gray-700'}>
                    {list.image}
                    {isOpen === true && <h1 className=' font-semibold'>{list.name}</h1>}
                </NavLink>  
            ))}
                </div>
            </div>
            <button onClick={()=>setIsOpen(true)} className={`${!isOpen ? 'block' : 'hidden'} md:hidden fixed top-[100px]`}>
            <BiSolidRightArrow size={38} className='p-2 bg-gray-600 rounded-lg text-white'/>
            </button>
            <aside className={`${isOpen ? 'block' :'hidden'} md:hidden z-30 grid px-4 w-fit bg-slate-50 h-svh  gap-4 p-4 fixed  top-0`}>
            {/* Small Sceen (handPhone) */}
       
            {SideBarList.map((list,index)=>(
                <NavLink to={list.path} key={index}className={({isActive})=> isActive
                ? 'flex gap-3 text-slate-900 bg-gray-400 px-2 rounded-lg items-center ' 
                : 'flex gap-3 items-center px-2 text-gray-700'}>
                    {list.image}
                    {isOpen === true && <h1 className=' font-semibold'>{list.name}</h1>}
                </NavLink>  
            ))}
            <button onClick={()=>setIsOpen(false)} className='flex justify-center items-center font-semibold text-2xl mt-2 px-3 py-1 bg-blue-400 rounded-md ml-3 text-white'>Close <MdExitToApp/> </button>
            </aside>
               </nav>
            </div>

        </>
        )
    
}

export default Sidebar