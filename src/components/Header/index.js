import './style.scss';
import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { InputLabel, FormControl, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

import { UserContext } from '../Context';

const Header = () => {
  // Import context

  const { user, logout, setUser } = useContext(UserContext);

  // Login and Register modals state

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  // Initial Login/Register state

  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
  });

  const [registerValue, setRegisterValue] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,

  });

  // Function to Open/Close Login/Register modals

  const registerModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setRegisterValue({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      zipCode: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const loginModal = () => {
    setShowLoginModal(!showLoginModal);
    setLoginValue({
      email: '',
      password: '',
    });
    setError({
      email: false,
      password: false,
    });
  };

  // Function for change Login state

  const LoginHandleChange = (event) => {
    setLoginValue({
      ...loginValue,
      [event.target.id]: event.target.value,
    });
  };

  // Function for change Register state // A GARDER AU CAS OU ...

  // const RegisterHandleChange = (event) => {
  //   setRegisterValue({
  //     ...registerValue,
  //     [event.target.id]: event.target.value,
  //   });
  // };

  const RegisterHandleChange = (prop) => (event) => {
    setRegisterValue({ ...registerValue, [prop]: event.target.value });
  };

  // Axios request for connect the user

  const ConnectUser = (event) => {
    event.preventDefault();
    setLoader(true);

    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/getUserTest',
    })
      .then((res) => {
        if (loginValue.email === res.data.email) {
          setTimeout(() => {
            setUser({
              infos: res.data,
              auth: true,
            });
            loginModal();
          }, 1000);
        }
        else {
          console.log('pas email correspondant');
          if (loginValue.email && loginValue.password) {
            setTimeout(() => {
              setError({
                email: false,
                password: false,
              });
            }, 1000);
          }
          else {
            setTimeout(() => {
              setError({
                email: !loginValue.email,
                password: !loginValue.password,
              });
            }, 1000);
          }
        }
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

  // Futur axios request for add a new user in the database

  const createAccount = (event) => {
    event.preventDefault();
    setLoader(true);
    setTimeout(() => {
      console.log(" j'ai submit inscription");
      setLoader(false);
      registerModal();
    }, 1000);
  };

  const handleShowPassword = () => {
    setRegisterValue({
      ...registerValue,
      showPassword: !registerValue.showPassword,
    });
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/"><i className="fas fa-biking" /></Link>
        <h3 className="header-logo-title">Trouv ton vélo</h3>
      </div>

      {/* MODAL LOGIN */}

      <Dialog open={showLoginModal} onClose={loginModal}>
        <DialogTitle sx={{
          color: '#18B7BE', fontSize: '7ch', textTransform: 'uppercase', textAlign: 'center',
        }}
        >Connexion
        </DialogTitle>
        <DialogContent>
          { loader && (
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <LinearProgress />
          </Box>
          )}
          <TextField
            required
            error={error.email}
            autoFocus
            margin="dense"
            id="email"
            label="Adresse email"
            type="email"
            fullWidth
            variant="standard"
            value={loginValue.email}
            onChange={LoginHandleChange}
          />
          <TextField
            required
            error={error.password}
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={loginValue.password}
            onChange={LoginHandleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={loginModal}>Annuler</Button>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={ConnectUser}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL REGISTER */}

      <Dialog sx={{ textAlign: 'center' }} open={showRegisterModal} onClose={registerModal}>
        <DialogTitle sx={{ color: '#18B7BE', fontSize: '7ch', textTransform: 'uppercase' }}>Inscription</DialogTitle>
        <DialogContent>
          { loader && (
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <LinearProgress />
          </Box>
          )}
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="firstName"
            label="Prénom"
            variant="standard"
            value={registerValue.firstName}
            onChange={RegisterHandleChange('firstName')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="lastName"
            label="Nom"
            variant="standard"
            value={registerValue.lastName}
            onChange={RegisterHandleChange('lastName')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="userName"
            label="Pseudo"
            variant="standard"
            value={registerValue.userName}
            onChange={RegisterHandleChange('userName')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="email"
            id="email"
            label="Email"
            variant="standard"
            value={registerValue.email}
            onChange={RegisterHandleChange('email')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="number"
            id="zipCode"
            label="Code Postal"
            variant="standard"
            value={registerValue.zipCode}
            onChange={RegisterHandleChange('zipCode')}
          />
          <FormControl sx={{ width: '50ch', margin: '2ch' }} variant="standard">
            <InputLabel htmlFor="password">
              Mot de passe
            </InputLabel>
            <Input
              id="password"
              type={registerValue.showPassword ? 'text' : 'password'}
              value={registerValue.password}
              onChange={RegisterHandleChange('password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {registerValue.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <FormControl sx={{ width: '50ch', marginTop: '1ch' }} variant="standard">
            <InputLabel htmlFor="passwordConfirm">
              Confirmer Mot de passe
            </InputLabel>
            <Input
              id="password-confirm"
              type={registerValue.showPassword ? 'text' : 'password'}
              value={registerValue.confirmPassword}
              onChange={RegisterHandleChange('passwordConfirm')}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={registerModal}>Annuler</Button>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={createAccount}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* Nav links */}

      <div className="header-nav">
        <div className="header-nav-links">
          <NavLink to="/offers" className="header-nav-link">Louer</NavLink>
          {user.auth && <NavLink to="/create" className="header-nav-link">Proposer</NavLink>}
          {user.auth && <NavLink to="/dashboard" className="header-nav-link">Profil</NavLink>}
        </div>
        <div className="header-nav-buttons">
          {!user.auth && <button className="header-nav-button register " type="button" onClick={registerModal}>S'inscrire</button>}
          {!user.auth && <button className="header-nav-button loggin" type="button" onClick={loginModal}>Connexion</button>}
          {user.auth && <button className="header-nav-button logout" type="button" onClick={logout}>Deconnexion</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
