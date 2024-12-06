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
            <div className='bg-white shadow-lg w-40 md:w-80 h-80 gap-10'>
            
                <div className="flex justify-end px-4 pt-4">
                    <button onClick={()=>setDropDownOpen(!dropDownOpen)}  className="i" type="button">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>

                    {/* DropDown menu */}
                    {dropDownOpen && (
                        <div  className="z-10 absolute text-base list-none bg-white rounded-lg shadow w-44 dark:bg-gray-700">
                            <div className='flex mb-1 justify-end'>
                                 <button onClick={()=>setDropDownOpen(!dropDownOpen)} className='rounded-full text-white font-bold  h-10 w-10 text-center'>X</button>
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
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data?.profilePictureUrl} />
                    <h5 className="mb-1 text-sm md:text-xl font-medium text-black truncate">{data?.name}</h5>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">{data?.role}</span>
                    <div className=" p-2 text-wrap h-auto break-words flex flex-wrap justify-center overflow-ellipsis  mt-4 md:mt-6">
                        <p className='text-white text-lg font-medium'>{data.phoneNumber ? data.phoneNumber : 'No Phone Number'}</p>
                        <p className='text-wrap break-all text-center break-words h-full text-white text-lg font-medium'>{data.email}</p>
                    </div>
                </div>

            </div>
        <Modals/>
    </div>
  )
}

export default CardUsers