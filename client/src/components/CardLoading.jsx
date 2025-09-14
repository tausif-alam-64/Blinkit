import React from 'react'

const CardLoading = () => {
  return (
    <div className='bg-white border py-3 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer animate-pulse'>
      <div className='min-h-20 lg:min-h-20 bg-blue-50 rounded'>  
      </div>
      <div className='p-3 max-sm:p-2 bg-blue-50 rounded w-20'>
      </div>
      <div className='p-3 max-sm:p-2 bg-blue-50 rounded'>
      </div>
      <div className='p-3 max-sm:p-2 bg-blue-50 rounded w-14'>
      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='p-3 max-sm:p-2 bg-blue-50 rounded w-20'>
      </div>
      <div className='p-3 max-sm:p-2 bg-blue-50 rounded w-20'>
      </div>
      </div>
    </div>
  )
}

export default CardLoading
