import { NavLink } from 'react-router-dom';
import './style.scss';

const Footer = () => (
  <div className="footer">
    <NavLink to="/about" className="footer-link">A propos</NavLink>
    <NavLink to="/legals" className="footer-link">Mentions légales</NavLink>
  </div>
);

export default Footer;
