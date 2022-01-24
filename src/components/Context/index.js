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
    },
    auth: false,
  });

  // const login = () => {
  //   setUser(() => ({
  //     ...user,
  //     firstname: 'Alex',
  //     lastname: 'Rousseau',
  //     username: 'Cyko92',
  //     email: 'alex@test.fr',
  //     zip_code: 78220,
  //     auth: true,
  //   }));
  // };
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
      },
      auth: false,
    }));
  };
  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
