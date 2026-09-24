import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    const {isLogin} = useContext(AuthContext);
    return !isLogin ? children : <Navigate to='/menu' />;
}

export default PublicRoute;