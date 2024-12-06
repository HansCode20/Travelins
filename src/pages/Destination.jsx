import React, { useEffect, useState } from 'react'
import DetailPage from '../components/Headers'
import {fetchExternalData} from '../utils/fetching'
import Card from '../components/Card'
import aos from 'aos'
import 'aos/dist/aos.css'
const Destination = () => {
  const [data,setData] = useState([])
  useEffect(()=>{
    aos.init({
      duration: 2000,
    })
  })


  useEffect(()=>{
    const fetchData = async()=>{
      const result = await fetchExternalData('activities');
      setData(result.data)
    }
    fetchData()
    },[])
    console.log(data)
    const imageurls = data.map(data=>data.imageUrls)

  return (
    <div data-aos="zoom-in" className='grid gap-4 mt-[50px] mb-[50px] mx-4 place-items-center '>
      <DetailPage title='Destination' imageurl={imageurls} />
      <div className='flex flex-wrap items-center justify-center gap-10'>
        {
          data.map(data =>(
            <Card url={`/destination/${data.id}`} name={data.title} price={data.price} imageurl={data.imageUrls}/>
            ))
          }
      </div>
    </div>
  )
}

export default Destination