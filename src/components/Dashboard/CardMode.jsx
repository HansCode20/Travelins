import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, isOpen, modalsData } from '../../feature/action';
import Modals from './Modals';
const CardMode = ({urlDelete, urlUpdate,data,url,title}) => {

 const ModalsData = useSelector((state)=>state.feature.Modalsdata)
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const Edits = (e) =>{
    e.preventDefault()
    dispatch(modalsData(data))
    dispatch(isOpen())
}
const token = localStorage.getItem('token')
const tokenParse = JSON.parse(token)
const id = data?.id
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
      const ress = await response.json();
      dispatch(isLoading(true))
     ;
    }catch(error){
      console.log(error)
    }
}
  return (
   <>
    <div key={data.id} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-5">

      <div className="aspect-w-4 aspect-h-3">
        {data?.imageUrls ? 
          data.imageUrls.map((img, index) => (
            <img key={index} src={img} alt={data?.title} referrerPolicy='no-referrer' className="object-cover w-full h-full" />
          )) :
          <img src={data?.imageUrl} alt={data?.title} className="w-full h-64 object-cover" />
        }
      </div>

      <div className="p-4">
        <div className="font-bold text-xl mb-2">{data?.name || data?.title}</div>
        <p className="text-gray-600">Created: {moment(data.createdAt).format('MMM Do YY')} / Updated: {moment(data.updatedAt).format('MMM Do YY')}</p>
        <p className="text-gray-700 mt-2 truncate">{data?.description}</p>
        {data.city &&  
          <p className="text-gray-700 mt-2">City: {data.city}/{data.province}</p>
        }
        {data?.promo_code && 
          <>
            <p className="text-gray-700 mt-2">Minimum claim price: {data?.minimum_claim_price}</p>
            <p className="text-gray-700">Code: {data?.promo_code}</p>
            <p className="text-gray-700">Terms condition: {data?.terms_condition}</p>
          </>
        }
      </div>

      <div className="px-4 py-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{data?.category?.name}</span>
      </div>

      <div className='flex justify-center items-center px-8 py-6'>
        <button className='flex items-center bg-red-500 px-4 py-1 font-semibold text-white rounded-lg mr-2' onClick={deleteId}><MdDelete size={20} className="mr-1" />Delete</button>
        <button className='flex items-center bg-blue-400 px-4 py-1 font-semibold text-white rounded-lg mr-2' onClick={Edits}><FaEdit size={20} className="mr-1" />Edit</button>
        <button className='flex items-center bg-green-600 px-4 py-1 font-semibold text-white rounded-lg' onClick={() => navigate(url)}><BiDetail size={20} className="mr-1" />Detail</button>
      </div>
      
    </div>

    <Modals urlUpdate={urlUpdate} title={title} data={ModalsData} />
   </>
  )
}

export default CardMode