import React from 'react'
import './loader.css'
const Loader = () => {
  return (
    <div className='flex w-full h-svh justify-center items-center '>
<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader