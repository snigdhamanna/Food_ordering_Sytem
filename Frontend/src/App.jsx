import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Login from './components/Login'
import Register from './components/Register'
import Menu from './components/Menu'
import OrderHistory from './components/OrderHistory'
import './assets/css/style.css'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path='/menu' element={<PrivateRoute><Menu/></PrivateRoute>}/>
          <Route path='/orders' element={<PrivateRoute><OrderHistory/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;