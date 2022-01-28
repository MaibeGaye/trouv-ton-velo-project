import './style.scss';
import { NavLink, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  // Modals state values

  const [loginModalValue, setLoginModalValue] = useState({});
  const [registerModalValue, setRegisterModalValue] = useState({});

  // Function useEffect after every changed user.token value

  useEffect(() => {
    const backUpToken = localStorage.getItem('token');
    const backUpSession = localStorage.getItem('logged');

    if (backUpSession || backUpToken) {
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

  // Function to Open/Close Login/Register modals

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
        console.log(err);
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

      {/* MODAL LOGIN */}

      <Dialog open={showLoginModal} onClose={handleLoginModal}>
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
            value={loginModalValue.email}
            onChange={loginHandleChangeValue('email')}
          />
          <TextField
            required
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={loginModalValue.password}
            onChange={loginHandleChangeValue('password')}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={handleLoginModal}>Annuler</Button>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={connectUser}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL REGISTER */}

      <Dialog sx={{ textAlign: 'center' }} open={showRegisterModal} onClose={handleRegisterModal}>
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
            value={registerModalValue.firstname}
            onChange={registerHandleChangeValue('firstname')}
          />
          <TextField
            fullWidth
            margin="dense"
            id="lastname"
            label="Nom"
            variant="standard"
            value={registerModalValue.lastname}
            onChange={registerHandleChangeValue('lastname')}
          />
          <TextField
            fullWidth
            margin="dense"
            id="username"
            label="Pseudo"
            variant="standard"
            value={registerModalValue.username}
            onChange={registerHandleChangeValue('username')}
          />
          <TextField
            fullWidth
            margin="dense"
            type="email"
            id="email"
            label="Email"
            variant="standard"
            value={registerModalValue.email}
            onChange={registerHandleChangeValue('email')}
          />
          <TextField
            fullWidth
            margin="dense"
            id="address"
            label="Adresse"
            variant="standard"
            value={registerModalValue.adress}
            onChange={registerHandleChangeValue('address')}
          />
          <TextField
            fullWidth
            margin="dense"
            type="number"
            id="zip_code"
            label="Code Postal"
            variant="standard"
            value={registerModalValue.zip_code}
            onChange={registerHandleChangeValue('zip_code')}
          />
          <FormControl sx={{ width: '50ch', margin: '2ch' }} variant="standard">
            <InputLabel htmlFor="password">
              Mot de passe
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={registerModalValue.password}
              onChange={registerHandleChangeValue('password')}
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
              value={registerModalValue.passwordConfirm}
              onChange={registerHandleChangeValue('passwordConfirm')}
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
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={handleRegisterModal}>Annuler</Button>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={createAccount}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* Nav links */}

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
