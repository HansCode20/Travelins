import React, { useEffect, useState } from "react";
import { fetchExternalData } from "../../utils/fetching";
import { useNavigate, useParams } from "react-router-dom";
import Card from '../../components/Card'
import Headers from '../../components/Headers'
import { IoBackspace } from "react-icons/io5";
import aos from 'aos'
import 'aos/dist/aos.css'
const Destinationbycategory = () => {
  const {id} = useParams()
  const [data,setData] = useState([])

  useEffect(()=>{
    aos.init({
      duration: 2000
    })
  },[])

  useEffect(()=>{
    const fetchData = async()=>{
      const result = await fetchExternalData('activities-by-category',`/${id}`);
      setData(result.data)
    }
    fetchData()
    },[])
    console.log(data)
    const imageurls = data.map(data=>data?.imageUrls)
    const navigate = useNavigate()
  return (
    <div className='grid gap-4 mt-[50px] mx-4 place-items-center'>
      {data?.length == 0 &&     
      <>
      <h1 className="p-4 text-xl font-semibold text-center">Sorry, there are no destinations for this category</h1>
      <button onClick={()=>navigate('/category')}  className="flex px-3 py-2 bg-slate-600 ease-in-out font-bold text-2xl rounded-md  brightness-50 hover:brightness-100  text-white"><IoBackspace size={34}/> Go Back</button>
      </>
     }
   <Headers title='Destination' imageurl={imageurls} />
   <div data-aos="zoom-out" className='flex flex-wrap items-center justify-center gap-10'>
    {data?.length>0 && data?.map((item)=>(
       <Card url={`/destination/${item?.id}`} name={item?.title} imageurl={item?.imageUrls}/>
      ))}
      </div>
      </div>
  )
}
export default Destinationbycategory;
