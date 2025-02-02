import './style.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Offer = ({
  title, infos, id, photo,
}) => (
  <div className=" offer">
    <div className="offer-img"><img src={photo} alt="" /></div>
    <h1 className="offer-title">{title}</h1>
    <p className="offer-infos">{infos}</p>
    <p className="offer-link"><Link to={`/offer/${id}/details`}>Details</Link></p>
  </div>
);

Offer.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  infos: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
export default Offer;
