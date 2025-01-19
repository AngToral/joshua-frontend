import React, { useEffect, useState } from 'react'
import { authContext } from './authContext';
import { useJwt } from "react-jwt";

const AuthUser = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const { decodedToken, isExpired } = useJwt(token);

    const userId = decodedToken?.id

    const setLogOut = () => {
        localStorage.removeItem('access_token')
        setToken(null)
    }

    const setLogIn = (login) => {
        localStorage.setItem('access_token', login)
        setToken(login)
    }

    useEffect(() => {
        console.log("token: ", token, "decodedToken: ", decodedToken, "userId: ", userId);
        if (isExpired) {
            setLogOut();
        }
    }, []);

    return (
        <authContext.Provider value={{ userId, token, setLogIn, setLogOut }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthUser