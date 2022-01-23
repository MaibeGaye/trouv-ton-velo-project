import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
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
import { InputLabel, FormControl } from '@mui/material';
import { UserContext } from '../Context';
import './style.scss';

const Header = () => {
  const { user, login, logout } = useContext(UserContext);

  // Login state modal

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');

  // Register state modal

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  // Login modal function

  const openLoginModal = () => {
    setShowLoginModal(true);
  };
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  // Register modal function

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  // Futur axios request for connect the user

  const connection = (event) => {
    event.preventDefault();
    if (loginEmail && loginPassword) {
      login();
      setEmail('');
      setPassword('');
      closeLoginModal();
    }
    else {
      console.log('error');
    }
  };

  // Futur axios request for add a new user in the database

  const createAccount = (event) => {
    event.preventDefault();
    console.log(" j'ai submit inscription");
    closeRegisterModal();
  };

  const showPassword = () => {
    setRegisterPassword({
      ...registerPassword,
      showPassword: !registerPassword.showPassword,
    });
  };

  const showConfirmPassword = () => {
    setRegisterPasswordConfirm({
      ...registerPasswordConfirm,
      showConfirmPassword: !registerPasswordConfirm.showConfirmPassword,
    });
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/"><i className="fas fa-biking" /></Link>
        <h3 className="header-logo-title">Trouv ton vélo</h3>
      </div>

      {/* MODAL LOGIN */}

      <Dialog open={showLoginModal} onClose={closeLoginModal}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="email"
            label="Adresse email"
            type="email"
            fullWidth
            variant="standard"
            value={loginEmail}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            required
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
            value={loginPassword}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button className="btn-test" variant="outlined" onClick={closeLoginModal}>Annuler</Button>
          <Button variant="outlined" onClick={connection}>Valider</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL REGISTER */}

      <Dialog open={showRegisterModal} onClose={closeRegisterModal}>
        <DialogTitle>Inscription</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="firstName"
            label="Prénom"
            variant="standard"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="lastName"
            label="Nom"
            variant="standard"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="userName"
            label="Pseudo"
            variant="standard"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            type="email"
            id="email"
            label="Email"
            variant="standard"
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            type="number"
            id="zipCode"
            label="Code Postal"
            variant="standard"
            value={zipCode}
            onChange={(event) => {
              setZipCode(event.target.value);
            }}
          />
          <FormControl sx={{ width: '50ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Mot de passe
            </InputLabel>
            <Input
              id="standard-adornment-confirm-password"
              type={registerPassword.showPassword ? 'text' : 'password'}
              value={registerPassword.password}
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPassword}
                  >
                    {registerPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <FormControl sx={{ width: '50ch', marginTop: '1ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Confirmer Mot de passe
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={registerPasswordConfirm.showConfirmPassword ? 'text' : 'password'}
              value={registerPasswordConfirm.password}
              onChange={(event) => {
                setRegisterPasswordConfirm(event.target.value);
              }}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showConfirmPassword}
                  >
                    {registerPasswordConfirm.showConfirmPassword
                      ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className="btn-test" variant="outlined" onClick={closeRegisterModal}>Annuler</Button>
          <Button variant="outlined" onClick={createAccount}>Valider</Button>
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
          {!user.auth && <button className="header-nav-button register " type="button" onClick={openRegisterModal}>S'inscrire</button>}
          {!user.auth && <button className="header-nav-button loggin" type="button" onClick={openLoginModal}>Connexion</button>}
          {user.auth && <button className="header-nav-button logout" type="button" onClick={logout}>Deconnexion</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
