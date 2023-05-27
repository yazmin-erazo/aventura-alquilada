import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserDataContext = ({ children }) => {
    const [CurrentUser, setCurrentUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
  
        }
    })
}