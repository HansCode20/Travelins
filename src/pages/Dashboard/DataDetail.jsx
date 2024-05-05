import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import DetaildataContent from '../../components/Dashboard/DetaildataContent'
const DataDetail = () => {
 const {id} = useParams()
 const {links} =useParams()

 const [data,setData] =useState([])
 const getItems =  () => {
  try {
   axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${links}/${id}`, {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k'
      },
    }).then((ress)=>{
      setData(ress.data.data)
    })

  } catch (error) {
    console.error('Error fetching promo details:', error);
  }
};
useEffect(()=>{
  getItems()
},[]) 
 
 return (
    <div className=''>
      <DetaildataContent dataTitle={links} data={{...data}}/>
    </div>
  )
}

export default DataDetail