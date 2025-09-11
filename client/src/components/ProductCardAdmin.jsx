import React from 'react'
import { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import { IoClose } from 'react-icons/io5'
import ConfirmBox from './ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        
        toast.success(responseData.message)

        if(fetchProductData){
          fetchProductData()
        }

        setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError()
    }
  }
  return (
    <div className='w-36 p-4 bg-white rounded'>
      <div>
        <img src={data?.image[0]} alt={data?.name} className='w-full h-full object-scale-down ' />
      </div>
      <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
      <p className='text-slate-400'>{data?.unit}</p>
      <div className='grid grid-cols-2 gap-3 py-2'> 
        <button onClick={() => setEditOpen(true)} className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
        <button onClick={() => setOpenDelete(true)} className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded'>Delete</button>
      </div>
      {
        editOpen && (
          <EditProductAdmin data={data} fetchProductData={fetchProductData} close={() => setEditOpen(false)} />
        )
      }
      {
        openDelete && (
          <ConfirmBox
            close={() => setOpenDelete(false)}
            cancel={() => setOpenDelete(false)}
            confirm={() => handleDelete()}
          />
        )
      }
    </div>

  )
}

export default ProductCardAdmin
