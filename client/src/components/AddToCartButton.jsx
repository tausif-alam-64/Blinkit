import React, { useState } from 'react'
import Loading from "./Loading"
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/globalProvider'

const AddToCartButton = ({data}) => {
    const [loading, setLoading] = useState(false)
    const {fetchCartItems} = useGlobalContext()

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data : {
                    productId : data?._id
                }
            })

            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItems){
                    fetchCartItems()
                }
            
            }
        } catch (error) {
            AxiosToastError(error)
        }finally {
            setLoading(false)
        }
    }
  return (
    <div className='w-full max-w-[150px]'>
      <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
        {loading ? <Loading /> : "Add"}
      </button>
    </div>
  )
}

export default AddToCartButton
