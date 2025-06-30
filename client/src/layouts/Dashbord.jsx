import React from 'react'
import UserManu from '../components/UserManu'
import { Outlet } from 'react-router-dom'

const Dashbord = () => {
  return (
    <section className='bg-white'>
        <div className='container max-auto p-3 grid lg:grid-cols-[250px,1fr] '>
            {/* left part for menu */}
            <div className='py-2 sticky top-24 overflow-y-auto hidden lg:block'>
               <UserManu />
            </div>

            {/* right part for content */}
            <div className='p-4'>
               <Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashbord
