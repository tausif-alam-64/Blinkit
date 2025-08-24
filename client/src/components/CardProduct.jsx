import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { validURLConvert } from '../utils/validURLConvert'

const CardProduct = ({data}) => {
  const url = `product/${validURLConvert(data.name)}-${data._id}`
  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer'>
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded'> 
        <img src={data.image[0]} alt="" className='w-full h-full object-scale-down scale-125' /> 
      </div>
      <div className='rounded text-sm w-fit p[1px] px-2 pt-1 text-green-600 bg-green-50'>
        10min
      </div>
      <div className='font-medium px-1 lg:px-0 text-ellipsis line-clamp-2 text-sm lg:text-base'>
        {data.name}
      </div>
      <div className='w-fit px-1 lg:px-0 text-sm lg:text-base'>
        {data.unit}
      </div>

      <div className='px-1 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='font-semibold'>
            {DisplayPriceInRupees(data.price)}
      </div>
      <div className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
        Add
      </div>
      </div>
    </Link>
  )
}

export default CardProduct
