import React, { useEffect, useState } from 'react'
import DetailPage from '../components/Headers'
import {fetchExternalData} from '../utils/fetching'
import Card from '../components/Card'
import aos from 'aos'
import 'aos/dist/aos.css'
const Category = () => {
  const [data,setData] = useState([])

  useEffect(()=>{ 
    aos.init({
      duration: 2000
    })
  })

  useEffect(()=>{
    const fetchData = async()=>{
      const result = await fetchExternalData('categories');
      setData(result.data)
    }
    fetchData()
    },[])
    const imageurls = data.map(data=>data?.imageUrl)
  return (
    <div data-aos="zoom-in" className='grid gap-4 mt-[50px] mx-4 place-items-center'>
   <DetailPage title='Categories' imageurl={imageurls} />
   <div className='flex flex-wrap items-center justify-center gap-10'>
   {
     data.map(data =>(
       <Card url={`/destinationbycategory/${data.id}`} name={data.name} imageurl={data.imageUrl}/>
      ))
    }
    </div>
      </div>
  )
}

export default Category