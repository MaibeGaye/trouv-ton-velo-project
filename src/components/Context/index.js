/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({

    infos: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      zip_code: '',
      address: '',
      password: '',
      id: '',
    },
    token: null,
    refreshToken: null,
    isExpired: false,
    logged: false,
    lende: [],
    borrow: [],
  });

  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem('logged');
      localStorage.removeItem('token');
      setUser({
        ...user,
        infos: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          zip_code: '',
          address: '',
          password: '',
          id: '',
        },
        token: null,
        logged: false,
        lende: [],
        borrow: [],
      });
    }, 1000);
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
