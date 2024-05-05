import React, { useEffect, useState } from 'react'
import { fetchExternalData } from '../../utils/fetching'
import Pagination from '../../components/Dashboard/Pagination'
import { useParams } from 'react-router-dom'
import CardUsers from '../../components/Dashboard/CardUsers'
import { isLoading, isOpen, modalsData } from '../../feature/action'
import { IoExit } from "react-icons/io5";
import axios from 'axios'
import { Toaster, toast } from 'sonner'
import Searchfeature from '../../components/Dashboard/Searchfeature'
import Loader from '../../components/UI/Loader'
import { useDispatch, useSelector } from 'react-redux'

const User = () => {
  const [data,setData] = useState([])
    const [currentPage,setCurrentPage] =useState(1)
    const [postPerPage,setPostPerPage] =useState(8)
    const lastPostPage = currentPage * postPerPage
    const firstPostIndex = lastPostPage -postPerPage
    const [modalDataUpdate,setModaldataUpdate] = useState(null)
    const [modalUser,setModalUser] = useState(false)
    const [roleValue,setRoleValue]=useState(modalDataUpdate?.role)
    const [searchQuery,setSearchQuery] = useState('')
    const userIdProps = () =>{
    console.log(modalDataUpdate)
   }
   const closeModal = () =>{
     setModaldataUpdate(null)
     setModalUser(false) 
   }
   console.log(roleValue)
   const token = localStorage.getItem('token')
   const tokenParse = JSON.parse(token)
   const handleUpdateUser = () =>{
     try{
       // Jika ada gambar yang dipilih, tambahkan ke FormData
       axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${modalDataUpdate?.id}`
       ,{role :roleValue},
     {
       headers:{
         apiKey:"24405e01-fbc1-45a5-9f5a-be13afcd757c",
         Authorization:`Bearer ${tokenParse}`
       }
     }).then((res)=>{
       toast.success(res.data.message)
       dispatch(isLoading(true))
     })
    }catch(error){
      console.log(error)
      toast.warning("Oops something error")
    }
  }


const currentPost = data.slice(firstPostIndex,lastPostPage)

 const loading = useSelector((state)=>state.feature.isLoading)
 const dispatch = useDispatch()
  useEffect(()=>{
      const fetchData = async()=>{
        const result = await fetchExternalData('all-user');
        setData(result.data)
        dispatch(isLoading(false))
      }
      fetchData()
     
      },[loading])
    

      if(loading){
        return <Loader/>
      }
      return (
   <div className='grid w-full place-content-center gap-4 place-items-center'>
   <h1 className='text-center text-3xl font-semibold mb-4'>Users</h1>
   <div className='grid  grid-cols-2 sm:grid-cols-3  md:grid-cols-4  w-full h-full  gap-2'>
   {currentPost.map((item)=>(
     <CardUsers key={item.id}
     setModaldataUpdate={setModaldataUpdate}
     userIdProps={userIdProps}
     setModalUser={setModalUser}
     data={{...item}
     }
/>
    ))}
    </div>
    <div className='pb-4'>
    <Toaster position='top-center' richColors></Toaster>
    <Pagination totalPosts={data.length} currentpage={ currentPage}  setCurrentpage={setCurrentPage} postsPerPage={postPerPage}/>
      </div>
     {/* Modal Edit Role */}
      <div
       className={`${modalUser ? 'block' : 'hidden'}
       w-svw h-svh bg-gray-700/50
       fixed top=0 right-0 left-0 bottom-0
       `}>
        <div className='h-full grid place-content-center place-items-center'>
          <div className='grid bg-slate-700 p-5'>
     <div className='flex w-full justify-end'>
        <button onClick={closeModal} className= 'text-white   '><IoExit size={32}/></button>
     </div>
      <h1 className='text-white font-semibold'>user name: {modalDataUpdate?.name}</h1>
      <h1 className='text-white font-semibold'>email: {modalDataUpdate?.email}</h1>
       <select className='p-2 mt-2 rounded-md' defaultValue={roleValue} onChange={(e)=>setRoleValue(e.target.value)}>
        {modalDataUpdate?.role == 'user' ? 
        <>
        <option>admin</option>
        <option>user</option>
        </> : 
        <>
        <option>user</option>
        <option>admin</option>
        </> }
       </select>
       <div className='flex mt-2 justify-end'>
       <button onClick={handleUpdateUser} className='bg-green-500 px-4 py-1 rounded-lg text-white font-semibold'>Confirm</button>
       </div>
        </div>
          </div>
      </div>
        {/* Modal Edit Role */}

   </div>
  )
}

export default User