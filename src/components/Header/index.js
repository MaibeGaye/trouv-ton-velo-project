import './style.scss';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <h3 className="header-title">Trouv ton vélo</h3>
    <div className="header-links">
      <NavLink to="/" className="header-link">Accueil</NavLink>
      <NavLink to="/offers" className="header-link">Nos Offres</NavLink>
      <NavLink to="/register" className="header-link">Inscription</NavLink>
      <NavLink to="/dashboard" className="header-link">Mon Profil</NavLink>
    </div>
  </div>
);

export default Header;
