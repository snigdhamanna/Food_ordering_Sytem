import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../AuthProvider'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_API}/token/`, {username, password});
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            setLogin(true);
            navigate('/menu');   
        } catch {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    return (
         <>
<div className='container'>
  <div className="row justify-content-center">
    <div className="col-md-6 bg-light-dark p-5 rounded">
      <h3 className='text-light text-center mb-4'>Log in </h3>
      <form onSubmit={handleLogin} >
        <div className='mb-3'>
        <input type="text" className='form-control ' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        
        <div className='mb-3'>
        <input type="password" className='form-control ' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
       
        </div>
        {error && <div className='text-danger' ></div>}
      
        {
            loading ? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled>please wait...</button>

            ) : (
                <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>

            )
        }
      
      </form>
    </div>
  </div>
</div>

    </>
    )
}

export default Login;