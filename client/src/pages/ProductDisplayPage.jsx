import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDisplayPage = () => {
  const params = useParams()
  console.log(params)
  return (
    <section className='sticky top-24 lg:top-20'>
     hello
    </section>
  )
}

export default ProductDisplayPage
