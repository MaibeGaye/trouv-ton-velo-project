import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    // firstname: '',
    // lastname: '',
    // username: '',
    // email: '',
    // zip_code: '',
    auth: false,
  });

  const login = () => {
    setUser(() => ({
      firstname: 'Alex',
      lastname: 'Rousseau',
      username: 'Cyko92',
      email: 'alex@test.fr',
      zip_code: 78220,
      auth: true,
    }));
  };
  const logout = () => {
    setUser(() => ({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      zip_code: '',
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
