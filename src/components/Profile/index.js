import './style.scss';
import PropTypes from 'prop-types';

const Profile = ({ logged }) => (
  <div className="container profile">
    {
        logged && <h1>Voici votre profil</h1>
    }
    {
        !logged && <h1>Retourner à l'accueil</h1>
      }
  </div>
);
Profile.propTypes = {
  logged: PropTypes.bool.isRequired,
}.isRequired;
export default Profile;
