import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserDataContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: "",
        lastName: "",
        role: ""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [value, setValue] = useState()

    window.addEventListener('storage', () => setValue(JSON.parse(sessionStorage.getItem('token'))));

    useEffect(() => {
        const fetchData = () => {
            const token = JSON.parse(sessionStorage.getItem('token'));
            if(token) {
                setIsLoggedIn(true);
                setCurrentUser(jwtDecode(token))
            }
        }
        fetchData();
    }, [value]);

    return (
        <>
            <UserContext.Provider value={{currentUser, isLoggedIn}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export { UserContext, UserDataContext }