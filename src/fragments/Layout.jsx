import React from 'react'
import Navbar from '../Navigate/Navbar'
import Footer from '../Navigate/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (  
    <div>
        <Navbar/>
      <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout