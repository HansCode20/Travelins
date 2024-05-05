import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modals from '../../components/Dashboard/Modals';
import { useDispatch } from 'react-redux';
import { isOpen, isPost } from '../../feature/action';
const Profil = () => {
  const [user,setUSer] = useState([])
  const dispatch = useDispatch()
  const getuserData = () =>{
  const tokenLocal =  JSON.parse(localStorage.getItem('token')) 
    axios
    .get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
        headers: {
            apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:`Bearer ${tokenLocal}`
        },
    })
    .then((res) => {
        setUSer(res.data.data)
    })
    .catch((err) => {
        console.log(err);
    });
  }
  useEffect(()=>{
    getuserData()
  },[])
  const openEditsModal = (e) =>{
    e.preventDefault()
    dispatch(isOpen())
  }

  console.log(user)
  const dataWithoutDI ={...user}
  delete dataWithoutDI.id

  console.log(dataWithoutDI )
  return (
    <div className='container mx-auto'>
    <h1 className='text-3xl mt-8 mb-4 text-center font-semibold text-gray-800'>Profile Information</h1>
    <div className='flex justify-center'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <img className='w-32 h-32 rounded-full mx-auto mb-4 border-2 border-black' src={user?.profilePictureUrl} alt='Profile Picture' />
        <h1 className='text-2xl font-bold text-center mb-4'>{user?.name}</h1>
        <button onClick={openEditsModal} className='block mx-auto mb-4 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300'>
          Edit Profile
        </button>
        <div className='grid gap-4'>
          {user !== null &&
            Object.keys(user).map((item, index) => (
              item !== 'id' && item !== 'profilePictureUrl' && item !== 'name' && (
                <div key={index} className='flex flex-col'>
                  <label className='text-sm font-bold  mb-2'>{item}</label>
                  <p className='text-lg font-semibold text-gray-800 border bg-gray-50 px-4 py-2'>{user[item]}</p>
                </div>
              )
            ))}
        </div>
      </div>
    </div>
    <Modals urlUpdate='update-profile' title='User Edits' data={dataWithoutDI} />
  </div>
  
  )
}

export default Profil