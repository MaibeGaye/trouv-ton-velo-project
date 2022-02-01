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
    token: '',
    logged: null,
    lende: [],
    borrow: [],
  });

  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem('logged');
      localStorage.removeItem('token');
      setUser({
        logged: false,
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
