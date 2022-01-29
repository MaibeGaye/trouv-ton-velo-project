/* eslint-disable no-console */
import './style.scss';
import { NavLink, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import validations from './RegisterValidation';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { UserContext } from '../Context';

const Header = () => {
  // Import context

  const { user, logout, setUser } = useContext(UserContext);

  // Login and Register modals state

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  // Modals state values

  const [loginModalValue, setLoginModalValue] = useState({
    email: '',
    password: '',
  });
  const [registerModalValue, setRegisterModalValue] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    address: '',
    zip_code: '',
    password: '',
    passwordConfirm: '',
  });

  // Function useEffect after every changed user.token value

  useEffect(() => {
    const backUpToken = localStorage.getItem('token');
    const backUpSession = localStorage.getItem('logged');

    if (backUpSession && backUpToken) {
      const backUpJWT = JSON.parse(backUpToken);
      const backUpLOG = JSON.parse(backUpSession);
      setUser({
        ...user,
        infos: {
          ...user.infos,
        },
        token: backUpJWT,
        logged: backUpLOG,
      });
    }
  }, []);

  // Function to change values from Login/Register modals

  const loginHandleChangeValue = (prop) => (event) => {
    setLoginModalValue({ ...loginModalValue, [prop]: event.target.value });
  };

  const registerHandleChangeValue = (prop) => (event) => {
    setRegisterModalValue({ ...registerModalValue, [prop]: event.target.value });
  };

  // Function to Open/Close Login/Register modals and reset state

  const handleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setRegisterModalValue({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      address: '',
      zip_code: '',
      password: '',
      passwordConfirm: '',
    });
    setErrors({});
  };

  const handleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setLoginModalValue({
      email: '',
      password: '',
    });
  };

  // Function to showPassword on register modal

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Axios POST request for connect the user

  const connectUser = (event) => {
    event.preventDefault();

    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/login',
      data: loginModalValue,
    })
      .then((res) => {
        setUser({
          ...user,
          infos: res.data,
          token: res.headers.authorization,
          logged: res.data.logged,
        });
        const createBackUpJWT = JSON.stringify(res.headers.authorization);
        localStorage.setItem('token', createBackUpJWT);
        const createBackUpLOG = JSON.stringify(res.data.logged);
        localStorage.setItem('logged', createBackUpLOG);
        handleLoginModal();
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  };

  // Axios POST request to create an account

  const createAccount = (event) => {
    event.preventDefault();
    setErrors(validations(registerModalValue));
    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/signup',
      data: registerModalValue,
    })
      .then((res) => {
        console.log(res.data);
        handleRegisterModal();
        setTimeout(() => {
          handleLoginModal();
        }, 1000);
      })
      .catch((err) => {
        console.log(err.request.responseText);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/"><i className="fas fa-biking" /></Link>
        <h3 className="header-logo-title">Trouv ton vélo</h3>
      </div>

      <LoginModal
        loginHandleChangeValue={loginHandleChangeValue}
        handleLoginModal={handleLoginModal}
        loginModalValue={loginModalValue}
        showLoginModal={showLoginModal}
        connectUser={connectUser}
        loader={loader}
      />

      <RegisterModal
        registerHandleChangeValue={registerHandleChangeValue}
        handleRegisterModal={handleRegisterModal}
        registerModalValue={registerModalValue}
        handleShowPassword={handleShowPassword}
        showRegisterModal={showRegisterModal}
        createAccount={createAccount}
        showPassword={showPassword}
        loader={loader}
        errors={errors}
      />

      <div className="header-nav">
        <div className="header-nav-links">
          <NavLink to="/offers" className="header-nav-link">Louer</NavLink>

          {user.logged
            && (
            <>
              <NavLink to="/create" className="header-nav-link">Proposer</NavLink>
              <NavLink to="/dashboard" className="header-nav-link">Profil</NavLink>
            </>
            )}
        </div>
        <div className="header-nav-buttons">
          {!user.logged
          && (
          <>
            <button className="header-nav-button register " type="button" onClick={handleRegisterModal}>S'inscrire</button>
            <button className="header-nav-button loggin" type="button" onClick={handleLoginModal}>Connexion</button>
          </>
          )}
          {user.logged && <button className="header-nav-button logout" type="button" onClick={logout}>Deconnexion</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
