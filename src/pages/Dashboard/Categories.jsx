import React, { useEffect, useState } from 'react'

import TabelContent from '../../components/Dashboard/TabelContent'
import { fetchExternalData } from '../../utils/fetching'
import Pagination from '../../components/Dashboard/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { CreatedData, isLoading } from '../../feature/action'
import { CategoryBody } from '../../utils/BodyData'
import Searchfeature from '../../components/Dashboard/Searchfeature'
import CardMode from '../../components/Dashboard/CardMode'
import Loader from '../../components/UI/Loader'
import { IoIosGrid } from 'react-icons/io'
import { FaIdCard } from 'react-icons/fa'
const Categories = () => {
    const [data,setData] = useState([])
    const [currentPage,setCurrentPage] =useState(1)
    const [postPerPage,setPostPerPage] =useState(5)
    const lastPostPage = currentPage * postPerPage
    const firstPostIndex = lastPostPage -postPerPage
    const [searchQuery,setSearchQuery] = useState('')
    const dispatch = useDispatch()
    const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const currentPost = filteredData.slice(firstPostIndex,lastPostPage)
   const loading = useSelector((state)=>state.feature.isLoading)
   const [gridMode,setGridMode] = useState(true)
   const handleModeGrid = (value) =>{
     setGridMode(value)
   }
  const fetchData = async()=>{
    const result = await fetchExternalData('categories');
    setData(result.data)
    dispatch(isLoading(false))
  }
    useEffect(()=>{
      dispatch(CreatedData(CategoryBody))

      fetchData()
      },[loading])
      if(loading){
        return <Loader/>
      }
  return (
   <>
    <>
    <Searchfeature setSearchQuery={setSearchQuery} />
    <div className='w-full flex justify-end mt-4 mb-4'>
      <button onClick={()=>handleModeGrid(true)} className={`${()=> 'text-blue-700'} text-4xl text-slate-700`}><IoIosGrid /></button>
      <button onClick={()=>handleModeGrid(false)} className='text-4xl mr-4 text-slate-700'><FaIdCard /></button>
    </div>
    <div className='grid-cols-1 place-content-center place-items-center '>
      {gridMode && 
    <div className='grid w-full  '>
    <TabelContent urlDelete="delete-category" urlUpdate="update-category" modalsTitle="category" title="Categories" url='delete-category' data={currentPost}/>

    </div>
    }
    <div className='flex flex-wrap justify-center items-center gap-8'>
    {!gridMode && 
    currentPost.map((data)=>(
      <CardMode title={'category'} urlDelete="delete-category" urlUpdate="update-category" key={data.id} url={`/dashboard/activity/${data.id}`} data={data}/>
    ))
  }
  </div>
    <div className='grid mt-2 '>
    <Pagination totalPosts={data.length} currentpage={ currentPage}  setCurrentpage={setCurrentPage} postsPerPage={postPerPage}/>
    </div>
    </div>
    </>
   </>
  )
}
export default Categories