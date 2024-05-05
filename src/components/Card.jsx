import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa";
import styled from 'styled-components'
import { formatRupiah } from '../utils/utils';
const Wrapper = styled.div`
background-image:url('${props=>props.imageUrl}');
background-size:cover;
background-color:black;
filter:brightness(50%);

`
const Card = ({name,imageurl,url,price}) => {
  const navigate = useNavigate()
  return (
<Wrapper imageUrl={imageurl}  className="max-sm:scale-95 hover:brightness-100 hover:scale-105 transition ease-in-out  w-72 h-80   max-w-sm object-center object-cover border bg-center border-gray-200 rounded-lg shadow">
      <div className='bg-green-700 z-30 w-fit px-6  py-1 rounded-e-lg'>
        <h1 className='text-white font-semibold'>{price && formatRupiah(price) }</h1>
                </div>
    <div class="p-5 grid place-content-end place-items-end h-full ">
        <a href="#">
            <h5 class="mb-2 z-20 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        </a>
       <button onClick={()=>navigate(url)}  class="inline-flex gap-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <p>See Detail</p>
            <FaLocationArrow size={18}/>
        </button>
    </div>
</Wrapper>
  )
}

export default Card