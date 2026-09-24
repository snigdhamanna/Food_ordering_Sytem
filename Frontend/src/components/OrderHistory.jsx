// components/OrderHistory.jsx
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

const statusColor = {
  pending: 'secondary',
  confirmed: 'info',
  preparing: 'warning',
  delivered: 'success',
}


const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/')
        setOrders(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return <p>Loading orders...</p>
  if (orders.length === 0) return <p>No orders yet.</p>

  return (
    <div className="container">
      <h3>Your Orders</h3>
      {orders.map(order => (
        <div key={order.id} className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between">
            <strong>Order #{order.id}</strong>
            <span className={`badge bg-${statusColor[order.status]}`}>{order.status}</span>
          </div>
          <ul className="mb-0 mt-2">
            {order.items.map(item => (
              <li key={item.id}>{item.quantity} x menu item #{item.menuitem}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory