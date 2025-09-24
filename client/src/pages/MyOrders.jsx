import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white shadow-md p-5 rounded-xl mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
      </div>

      {/* No Orders */}
      {!orders?.length && (
        <div className="flex justify-center mt-10">
          <NoData />
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {orders?.map((order, index) => (
          <div
            key={order._id + index + "order"}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-shadow duration-200 border border-gray-100"
          >
            <p className="text-gray-500 text-sm mb-2">Order No: <span className="font-medium text-gray-800">{order?.orderId}</span></p>

            <div className="flex items-center gap-4">
              <img 
                src={order.product_details.image[0]} 
                alt={order.product_details.name} 
                className="w-16 h-16 rounded object-cover border"
              />
              <p className="font-semibold text-gray-700">{order.product_details.name}</p>
            </div>

            <div className="mt-3 text-gray-600 text-sm">
              <p>Total Amount: <span className="font-medium text-gray-800">₹{order.totalAmt}</span></p>
              <p>Payment Status: <span className="font-medium text-gray-800">{order.payment_status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
