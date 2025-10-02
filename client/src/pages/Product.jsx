import React from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect, useState } from 'react'

const Product = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [totalNoPage, setTotalPage] = useState(1)

    const fetchProductData = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.getProduct,
                data : {
                    page : page,
                    limit: 12
                }
            })

            const {data : responseData} = response

            
            if(responseData.success){
                setProductData(responseData.data)
                setTotalPage(responseData.totalNoPage)
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
      fetchProductData()  
    }, [page])
  return (
    <div>
      Product
    </div>
  )
}

export default Product
