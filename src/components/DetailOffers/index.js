import './style.scss';
import PropTypes from 'prop-types';

const Details = ({ logged }) => (
  <div className="container detail">
    {
      logged ? <p>Voici les details</p> : <p>Merci de vous connecter</p>
    }
    <h1>Composant Details Offert</h1>
  </div>
);
Details.propTypes = {
  logged: PropTypes.bool.isRequired,
}.isRequired;
export default Details;
