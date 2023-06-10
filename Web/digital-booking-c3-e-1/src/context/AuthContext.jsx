import React, { createContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
        user: JSON.parse(sessionStorage.getItem('user')) || {
            name: "",
            lastname: "",
            role: ""
        },
        favoritos: [32,48,132],
        token: sessionStorage.getItem('token') || "",
        isLogedIn: sessionStorage.getItem('token') ? true : false
    }

    const authReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                sessionStorage.setItem('token', action.payload.token);
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
                return {
                    ...state,
                    user: action.payload.user,
                    favoritos: [32,48,132],
                    isLogedIn: true,
                    token: action.payload.token
                }
            case "LOGOUT":
                sessionStorage.clear();
                return {
                    ...state,
                    user: { name: "",
                    lastname: "",
                    role: "",
                    favoritos: [32,48,132] },
                    token: "",
                    isLogedIn: false
                }
                
                default:
                    return state;
        }
    }
    
    const UserDataContext = ({ children }) => {
    
    const [state, dispatch] = useReducer( authReducer, initialState )
    
    const data = {
        dispatch,
        user: state.user,
        isLogedIn: state.isLogedIn,
        favs: state.favoritos
    }
    
    return (
        <>
            <UserContext.Provider value={data}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export { UserContext, UserDataContext }