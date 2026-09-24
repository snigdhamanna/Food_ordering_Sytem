import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_BASE_API}/register/`, {username, email, password});
            setErrors({});
            setSuccess(true);
        } catch (error) {
            setErrors(error.response.data);
        } finally {
            setLoading(false);
        }
    }
    

    return (
       <>
<div className='container'>
  <div className="row justify-content-center">
    <div className="col-md-6 bg-light-dark p-5 rounded">
      <h3 className='text-light text-center mb-4'>Create an Account</h3>
      <form onSubmit={handleRegistration} >
        <div className='mb-3'>
        <input type="text" className='form-control ' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && (<small> <div className='text-danger'>{errors.username}</div> </small>)}
        </div>
        <div className='mb-3'>
        <input type="email" className='form-control ' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && (<small> <div className='text-danger'>{errors.email}</div></small>)}
         </div>
        <div className='mb-3'>
        <input type="password" className='form-control ' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && (<small> <div className='text-danger'>{errors.password}</div>  </small>)}
        </div>

        {success && <div className='alert alert-success'>Registration Successfull</div>}
        {
            loading ? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled>please wait...</button>

            ) : (
                <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>

            )
        }
      
      </form>
    </div>
  </div>
</div>

    </>
    )
}

export default Register;