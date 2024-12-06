import React, { useState } from 'react'
import axios from 'axios'
import Modals from './Modals'
import { useDispatch } from 'react-redux'
import { isLoading, isOpen } from '../../feature/action'
import { modalsData } from '../../feature/action'
import { Toaster,toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AiFillFile } from "react-icons/ai";
const ActionTab = ({id,value,urlDelete,link}) => {
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const token = localStorage.getItem('token')
    const tokenParse = JSON.parse(token)
    const deleteId = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${urlDelete}/${id}`,{
              method:"DELETE",
              headers:{
                apiKey:'24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization:`Bearer ${tokenParse}`
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            dispatch(isLoading(true))
            toast.success(data.message)
            return data;
          } catch (error) {
            console.error('Error fetching data:')
            return null;
          }
    }
    const Edits = (e) =>{
        e.preventDefault()
        dispatch(modalsData(value))
        dispatch(isOpen())
    }
    const goTo = (e) =>{
      e.preventDefault()
      navigate(`/dashboard/${link}/${id}`)
    }
  return (
      <td className='w-full flex gap-2 justify-center'>
        <Toaster position='top-center' richColors>
    </Toaster>
        <button className='cursor-pointer ' onClick={deleteId}>
    <MdDelete size={24}/>
    </button>
        <button  className='cursor-pointer' onClick={Edits}>
    <AiFillEdit size={24} />
     </button>
        <button onClick={goTo}>
        <AiFillFile size={24} />
     </button>
        </td>
  )
}

export default ActionTab