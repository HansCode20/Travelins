import React, { useEffect, useState } from 'react'
import TabelContent from '../../components/Dashboard/TabelContent'
import { fetchExternalData } from '../../utils/fetching'
import Pagination from '../../components/Dashboard/Pagination'
import { BannerBody } from '../../utils/BodyData'
import { useDispatch, useSelector } from 'react-redux'
import { CreatedData, isLoading } from '../../feature/action'
import Loader  from '../../components/UI/Loader'
import { IoIosGrid } from "react-icons/io";
import Searchfeature from '../../components/Dashboard/Searchfeature'
import { FaIdCard } from "react-icons/fa";
import CardMode from '../../components/Dashboard/CardMode'
const Banner = () => {
  const [data,setData] = useState([])
  const [currentPage,setCurrentPage] =useState(1)
  const [postPerPage,setPostPerPage] =useState(6)
  const lastPostPage = currentPage * postPerPage
  const firstPostIndex = lastPostPage -postPerPage
  const dispatch = useDispatch()
  const fetchData = async()=>{
    const result = await fetchExternalData('banners');
    setData(result.data)
    dispatch(isLoading(false))
  }
  const [searchQuery,setSearchQuery] = useState('')

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
  useEffect(()=>{
    dispatch(CreatedData(BannerBody))
    fetchData()
    },[loading])

    if(loading){
      return <Loader/>
    }


  return (  
    <>
    <Searchfeature setSearchQuery={setSearchQuery} />
    <div className='w-full flex justify-end mt-4 mb-4 '>
      <button onClick={()=>handleModeGrid(true)} className={`${()=> 'text-blue-700'} text-4xl text-slate-700`}><IoIosGrid /></button>
      <button onClick={()=>handleModeGrid(false)} className='text-4xl mr-4 text-slate-700'><FaIdCard /></button>
    </div>

    <div className='grid-cols-1 place-content-center place-items-center'>
      {gridMode && 
        <div className='grid w-full '>
          <TabelContent  urlDelete="delete-banner" urlUpdate="update-banner" modalsTitle='banner'  title="Banner" data={currentPost}/>
        </div>
      }
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
        {!gridMode && 
            currentPost.map((data)=>(
              <CardMode  urlDelete="delete-banner" urlUpdate="update-banner" url={`/dashboard/banner/${data.id}`} key={data.id} title="Banner" data={data}/>
            ))
        }
      </div>

      <div className='grid mt-2 '>
         <Pagination totalPosts={data.length} currentpage={ currentPage}  setCurrentpage={setCurrentPage} postsPerPage={postPerPage}/>
      </div>
      
    </div>
    </>
  )
}

export default Banner