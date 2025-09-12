import React, { useState } from 'react'
import CardLoading from '../components/CardLoading'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadingArrayCard = new Array(10).fill(null)
  return (
    <section className='bg-white'>
      <div className='mx-auto container p-4'>
        <p className='font-semibold'>Search Results : {data.length}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
          {
            loading && (
              loadingArrayCard.map((_,index) => {
                return (
                  <CardLoading key={"loading" + index} />
                )
              })
            )
          }
        </div>
      </div>
    </section>
  )
}

export default SearchPage
