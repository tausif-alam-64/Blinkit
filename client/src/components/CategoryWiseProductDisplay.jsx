import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight} from "react-icons/fa6"

const CategoryWiseProductDisplay = ({id, name}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data : {
          id : id
        }
      })

      const {data : responseData} = response

      if(responseData.success){
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=> {
    fetchCategoryWiseProduct()
  }, [])

  const loadingCardNumber = new Array(7).fill(null)
  return (
    <div>
        <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link className="text-green-600 hover:text-green-400" to="">See All</Link>
        </div>
        <div className='flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4'>
          { loading &&
            loadingCardNumber.map((_,index) =>{
              return(
                <CardLoading key={index+"CategorywiseProduct234"} />
              )
            })
          }
          {
            data.map((p,index) => {
              return(
                 <CardProduct key={p._id+index+"CategorywiseProduct"} data={p} />
              )
            })
          }

          <div className=' w-full left-0 right-0 container mx-auto px-2 hidden lg:flex justify-between absolute'>
            <button className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-4 rounded-full' >
              <FaAngleLeft   />
            </button>
            <button className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-4 rounded-full'>
              <FaAngleRight  />
            </button>
          </div>
        </div>
      </div>
  )
}

export default CategoryWiseProductDisplay
