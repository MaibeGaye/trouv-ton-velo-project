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
      auth: false,
    },
  });

  const logout = () => {
    setUser(() => ({
      infos: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        zip_code: '',
        address: '',
        password: '',
        auth: false,
      },
    }));
  };
  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
