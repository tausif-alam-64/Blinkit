import React from 'react'
import UserManu from '../components/UserManu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => (
    <section className='bg-white h-full w-full py-2'>
        <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
            <IoClose size={20} />
        </button>
        <div className='container mx-auto px-3 pb-8'>
            <UserManu />
        </div>
    </section>
)

export default UserMenuMobile
