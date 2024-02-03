import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}
export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        user : null,
        token : ""
    });
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if(data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user : parseData.userExist,
                token : parseData.token
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}