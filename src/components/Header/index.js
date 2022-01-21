import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './style.scss';

const Header = ({ logged, connect }) => {
  // initialization for modale state by default "false"
  const [showModal, setShowModal] = useState(false);
  // composant modale by default "empty";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // function who change state as "true" for modale
  const openModal = () => {
    setShowModal(true);
  };
  // function who change state as "false" for modale
  const closeModal = () => {
    setShowModal(false);
    setEmail('');
    setPassword('');
  };
  const connection = (event) => {
    event.preventDefault();
    if (email && password) {
      connect();
      setEmail('');
      setPassword('');
      closeModal();
    }
    else {
      // console.log('error');
    }
  };

  return (
    <div className="header">
      <h3 className="header-title">Trouv ton vélo</h3>
      <div className="header-links">
        <NavLink to="/" className="header-link">Accueil</NavLink>
        <Dialog open={showModal} onClose={closeModal}>
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
              value={email}
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
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button className="btn-test" variant="outlined" onClick={closeModal}>Annuler</Button>
            <Button variant="outlined" onClick={connection}>Valider</Button>
          </DialogActions>
        </Dialog>
        {logged && <NavLink to="/detail" className="header-link">details</NavLink>}
        {logged && <NavLink to="/dashboard" className="header-link">Mon Profil</NavLink>}
        {!logged && <NavLink to="/register" className="header-link">Inscription</NavLink>}
        {!logged && <button className="header-button" type="button" onClick={openModal}>Se connecter</button>}
        {logged && <button className="header-button" type="button" onClick={connect}>Se deconnecter</button>}
      </div>
    </div>
  );
};
Header.propTypes = {
  logged: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
}.isRequired;

export default Header;
