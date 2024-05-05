import React, { useState } from 'react'
import Modals from './Modals'

const CardUsers = ({setModalUser,userIdProps,data,setModaldataUpdate}) => {
  const [dropDownOpen,setDropDownOpen]= useState(false)
 const setuserProps = () =>{
    setModaldataUpdate({
        id:data.id,
        name:data.name,
        email:data.email,
        role:data.role
    })
    setModalUser(true)
    userIdProps()
    setDropDownOpen(false)
 }
  return (
    <div key={data.id}>

    
<div className="w-44 sm:w-52 max-w-60 h-80 sm:h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    <div className="flex justify-end px-4 pt-4">
        <button onClick={()=>setDropDownOpen(!dropDownOpen)}  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
{/* DropDown menu */}
{dropDownOpen && (
        <div  className="z-10 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <div className='flex mb-1 justify-end bg-gray'>
            <button onClick={()=>setDropDownOpen(!dropDownOpen)} className=' p-2 rounded-full text-gray-500 font-bold hover:border-2 hover:border-gray-500 hover:bg-slate-600 h-10 w-10 text-center'>X</button>
                </div>
            <ul className="py-2" >
            <li>
                <button onClick={setuserProps} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Role</button>
            </li>
            </ul>
        </div>
        
        )}
    </div>
    <div className="flex flex-col h-auto w-auto text-wrap break-words items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.profilePictureUrl} />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{data.role}</span>
        <div className=" p-2 text-wrap h-auto break-words flex flex-wrap justify-center overflow-ellipsis  mt-4 md:mt-6">
        <p className='text-white text-lg font-medium'>{data.phoneNumber}</p>
        <p className='text-wrap break-all text-center break-words h-full text-white text-lg font-medium'>{data.email}</p>
        </div>
    </div>
</div>
<Modals/>
</div>
  )
}

export default CardUsers