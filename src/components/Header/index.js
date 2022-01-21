import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

const Header = ({ logged, connect, name }) => (
  <div className="header">
    <h3 className="header-title">Trouv ton vélo</h3>
    {logged
      && <p className="header-link">Bonjour {name}</p>}
    <div className="header-links">
      {logged
      && <button type="button" onClick={connect}>Se Deconnecter</button>}
      {!logged
      && <button type="button" onClick={connect}>Se connecter</button>}
      <NavLink to="/" className="header-link">Accueil</NavLink>
      {logged
      && <NavLink to="/offers" className="header-link">Nos Offres</NavLink>}
      {logged
      && <NavLink to="/dashboard" className="header-link">Mon Profil</NavLink>}
      {!logged
      && <NavLink to="/register" className="header-link">Inscription</NavLink>}
    </div>
  </div>
);
Header.propTypes = {
  logged: PropTypes.bool.isRequired,
  connect: PropTypes.func.isRequired,
}.isRequired;

export default Header;
