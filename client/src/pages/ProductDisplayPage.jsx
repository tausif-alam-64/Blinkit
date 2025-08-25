import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDisplayPage = () => {
  const params = useParams()
  console.log(params)
  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr]'>
        {/* sub category */}
        <div className=' min-h-[79vh]'>
          
        </div>

       {/* product */}
        <div className=''>
          Product
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage
