import { Link } from 'react-router-dom';
import './style.scss';

const Footer = () => (
  <div className="footer">
    <div className="footer-fakediv" />
    <div className="footer-links">
      <Link to="/about" className="footer-link">A propos</Link>
      <Link to="/legals" className="footer-link">Mentions légales</Link>
    </div>
    {/* <div className="footer-medias">
      <i className="fab fa-facebook" />
      <i className="fab fa-instagram" />
    </div> */}
  </div>
);

export default Footer;
