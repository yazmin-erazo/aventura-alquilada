import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(/* tu estado inicial aquí */);
  const [userDispatch, setUserDispatch] = useState(/* tu función de dispatch aquí */);

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };