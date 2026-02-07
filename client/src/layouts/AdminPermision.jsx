import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermision = ({children}) => {
    const user = useSelector(state => state.user)

  return (
    <>
      {
        isAdmin(user.role) ? children : <p className='text-black bg-gray-200 p-4'>Do not have permision</p>
      }
    </>
  )
}

export default AdminPermision
