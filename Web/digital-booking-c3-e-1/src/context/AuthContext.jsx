import React, { createContext, useEffect, useReducer } from "react";

const UserContext = createContext();
const userFromStorage = sessionStorage.getItem("user");
const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
const initialState = {
  user: parsedUser || {
    name: "",
    lastname: "",
    role: "",
    favorites: [],
    initialsColor: "",
  },
  token: sessionStorage.getItem("token") || "",
  isLogedIn: sessionStorage.getItem("token") ? true : false,
  userLocation: null,
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
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
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
    case "SET_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};

const UserDataContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // -------------- START LOCATION USER ------------------
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if ("geolocation" in navigator) {
          // Obtener la ubicación del usuario
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              
              dispatch({ type: "SET_USER_LOCATION", payload: userLocation });
            },
            (error) => {
              console.error(
                "Error al obtener la ubicación del usuario:",
                error
              );
            }
          );
        } else {
          console.error("El navegador no soporta la geolocalización.");
        }
      } catch (error) {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    };

    getUserLocation();
  }, []);

  // -------------- END LOCATION USER ------------------

  const data = {
    dispatch,
    user: state.user,
    isLogedIn: state.isLogedIn,
    userLocation: state.userLocation,
  };

  return (
    <>
      <UserContext.Provider value={data}>{children}</UserContext.Provider>
    </>
  );
};

export { UserContext, UserDataContext };
