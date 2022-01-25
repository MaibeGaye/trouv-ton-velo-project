import './style.scss';
import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
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
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    address: '',
    zip_code: '',
    password: '',
    passwordConfirm: '',
  });

  // useEffect(() => {
  //   const backUpLog = localStorage.getItem('infos');
  //   if (backUpLog) {
  //     const backUpSession = JSON.parse(backUpLog);
  //     setUser({
  //       ...user,
  //       infos: backUpSession,
  //     });
  //   }
  // }, []);

  // Function to Open/Close Login/Register modals

  const registerModal = () => {
    setShowRegisterModal(!showRegisterModal);
    setRegisterValue({
      username: '',
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      address: '',
      zip_code: '',
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

  // Function for change  state

  const LoginHandleChange = (event) => {
    setLoginValue({
      ...loginValue,
      [event.target.id]: event.target.value,
    });
  };

  const RegisterHandleChange = (prop) => (event) => {
    setRegisterValue({ ...registerValue, [prop]: event.target.value });
  };

  // Axios request for connect the user

  const connectUser = (event) => {
    event.preventDefault();
    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/login',
      data: loginValue,
    })
      .then((res) => {
        setTimeout(() => {
          setUser({
            ...user,
            infos: res.data,
          });
          // const backUp = JSON.stringify(res.data);
          // localStorage.setItem('infos', backUp);
          loginModal();
        }, 1000);
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

  // Axios request for add a new user in the database

  const createAccount = (event) => {
    event.preventDefault();
    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/signup',
      data: registerValue,
    })
      .then((res) => {
        console.log(res.data);

        setTimeout(() => {
          loginModal();
        }, 1000);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={connectUser}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL REGISTER */}

      <Dialog sx={{ textAlign: 'center' }} open={showRegisterModal} onClose={registerModal}>
        <DialogTitle sx={{ color: '#18B7BE', fontSize: '7ch', textTransform: 'uppercase' }}>Inscription</DialogTitle>
        <DialogContent>
          { loader && (
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <LinearProgress sx={{ backgroundColor: '#18B7BE' }} />
          </Box>
          )}
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="firstname"
            label="Prénom"
            variant="standard"
            value={registerValue.firstname}
            onChange={RegisterHandleChange('firstname')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="lastname"
            label="Nom"
            variant="standard"
            value={registerValue.lastname}
            onChange={RegisterHandleChange('lastname')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="username"
            label="Pseudo"
            variant="standard"
            value={registerValue.username}
            onChange={RegisterHandleChange('username')}
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
            autoFocus
            fullWidth
            margin="dense"
            id="address"
            label="Adresse"
            variant="standard"
            value={registerValue.adress}
            onChange={RegisterHandleChange('address')}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="number"
            id="zip_code"
            label="Code Postal"
            variant="standard"
            value={registerValue.zip_code}
            onChange={RegisterHandleChange('zip_code')}
          />
          <FormControl sx={{ width: '50ch', margin: '2ch' }} variant="standard">
            <InputLabel htmlFor="password">
              Mot de passe
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={registerValue.password}
              onChange={RegisterHandleChange('password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
              type={showPassword ? 'text' : 'password'}
              value={registerValue.passwordConfirm}
              onChange={RegisterHandleChange('passwordConfirm')}
              endAdornment={(
                <InputAdornment position="end" sx={{ display: 'none' }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
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
          {user.infos.auth && <NavLink to="/create" className="header-nav-link">Proposer</NavLink>}
          {user.infos.auth && <NavLink to="/dashboard" className="header-nav-link">Profil</NavLink>}
        </div>
        <div className="header-nav-buttons">
          {!user.infos.auth && <button className="header-nav-button register " type="button" onClick={registerModal}>S'inscrire</button>}
          {!user.infos.auth && <button className="header-nav-button loggin" type="button" onClick={loginModal}>Connexion</button>}
          {user.infos.auth && <button className="header-nav-button logout" type="button" onClick={logout}>Deconnexion</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
