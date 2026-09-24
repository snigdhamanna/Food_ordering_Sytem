import {createContext, useState} from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLogin, setLogin] = useState(!!localStorage.getItem('accessToken'));
    return (
        <AuthContext.Provider value={{setLogin, isLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export {AuthContext};