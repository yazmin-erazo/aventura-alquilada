import React, { createContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || {
    name: "",
    lastname: "",
    role: "",
    favorites: [],
    initialsColor: "",
  },
  token: sessionStorage.getItem("token") || "",
  isLogedIn: sessionStorage.getItem("token") ? true : false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        isLogedIn: true,
        token: action.payload.token,
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        user: {
          name: "",
          lastname: "",
          role: "",
          favorites: [],
          initialsColor: "",
        },
        token: "",
        isLogedIn: false,
      };
    case "FAVS":
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_FAVORITES":
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const UserDataContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const data = {
    dispatch,
    user: state.user,
    isLogedIn: state.isLogedIn,
  };

  return (
    <>
      <UserContext.Provider value={data}>{children}</UserContext.Provider>
    </>
  );
};

export { UserContext, UserDataContext };
