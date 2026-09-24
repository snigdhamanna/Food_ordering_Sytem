// components/Cart.jsx
import { useState } from 'react'
import axiosInstance from '../axiosInstance'

const Cart = ({ cart, items, setCart }) => {
  const [placing, setPlacing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const getName = (menuitemId) => items.find(i => i.id === menuitemId)?.name

  const placeOrder = async () => {
    setPlacing(true)
    setError('')
    try {
      await axiosInstance.post('/orders/', { items: cart })
      setSuccess(true)
      setCart([])
    } catch (err) {
      setError('Could not place order')
    } finally {
      setPlacing(false)
    }
  }

  if (cart.length === 0) return null

  return (
    <div className="border p-3">
      <h5>Your Cart</h5>
      <ul>
        {cart.map(i => (
          <li key={i.menuitem}>{i.quantity} x {getName(i.menuitem)}</li>
        ))}
      </ul>
      {success && <p className="text-success">Order placed!</p>}
      {error && <p className="text-danger">{error}</p>}
      
      <button className="btn btn-success" onClick={placeOrder} disabled={placing}>
        {placing ? 'Placing order...' : 'Place Order'}
      </button>
    </div>
  )
}

export default Cart