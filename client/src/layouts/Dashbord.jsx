import React from 'react'
import UserManu from '../components/UserManu'
import { Outlet } from 'react-router-dom'

const Dashbord = () => {
  return (
    <section className='bg-white'>
        <div className='container max-auto p-3 grid lg:grid-cols-[250px,1fr] '>
            {/* left part for menu */}
            <div className='py-2 sticky top-24 overflow-y-auto hidden lg:block border-r'>
               <UserManu />
            </div>

            {/* right part for content */}
            <div className='min-h-[75vh]'>
               <Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashbord
