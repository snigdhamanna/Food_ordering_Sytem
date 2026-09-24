// components/Menu.jsx — add cart state and an add-to-cart handler
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import Cart from './Cart'

const Menu = () => {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])   

  useEffect(() => {
    axiosInstance.get('/menu/').then(res => setItems(res.data))
  }, [])

  const addToCart = (menuitemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuitem === menuitemId)
      if (existing) {
        return prev.map(i =>
          i.menuitem === menuitemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      
      return [...prev, { menuitem: menuitemId, quantity: 1 }]

    })
  }

  return (
    <div className="container">
      <h3>Menu</h3>
      <ul className="list-group mb-4">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span>{item.name} — ${item.price}</span>
            <button className="btn btn-sm btn-outline-primary" onClick={() => addToCart(item.id)}>
              Add
            </button>
          </li>
        ))}
      </ul>
      <Cart cart={cart} items={items} setCart={setCart} />
    </div>
  )
}

export default Menu
