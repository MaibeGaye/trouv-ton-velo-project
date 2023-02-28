import { Link } from 'react-router-dom';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-fakediv" />
      <div className="footer-links">
        <Link to="/about" className="footer-link">A propos</Link>
        <Link to="/legals" className="footer-link">Mentions légales</Link>
      </div>
    </div>
  );
}

export default Footer;
