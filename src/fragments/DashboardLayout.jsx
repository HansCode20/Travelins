import React  from 'react'
import Sidebar from '../Navigate/Sidebar'
import { Outlet } from 'react-router-dom'
const DashboardLayout = () => {
  return (
    <div className='flex w-full '>
    <Sidebar/>
      <main className='mt-10 w-full  '>
      <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout