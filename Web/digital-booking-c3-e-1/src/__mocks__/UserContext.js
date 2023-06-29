import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState();
  const [userDispatch, setUserDispatch] = useState();

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };