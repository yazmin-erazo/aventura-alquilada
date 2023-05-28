import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserDataContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        name: "Naty",
        lastName: "Moreira",
        role: "admin"
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            const token = JSON.parse(sessionStorage.getItem('token'));
            if(token) {
                setIsLoggedIn(true);
                setCurrentUser(jwtDecode(token))
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <UserContext.Provider value={{currentUser, isLoggedIn}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export { UserContext, UserDataContext }