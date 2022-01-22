import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', auth: false });

  const login = () => {
    setUser(() => ({
      name: 'Alex',
      auth: true,
    }));
  };
  const logout = () => {
    setUser(() => ({
      name: '',
      auth: false,
    }));
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
