/* eslint-disable camelcase */
import { useParams, Navigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

const OfferDetails = ({ offerDetail }) => {
  const { id } = useParams();
  const foundOffer = offerDetail.find((offer) => offer.id === +id);

  if (!foundOffer) {
    return <Navigate to="/404" />;
  }
  const {
    title, infos, address, helmet, lamps,
    model, photo, safety_lock, size, validity_end_date,
    validity_start_date, zip_code,
  } = foundOffer;

  return (
    <div className="container offer-details">
      <h1 className="offer-details-title">{title}</h1>
      <p>Adresse : {address} {zip_code}</p>
      <p>{photo}</p>
      <p> {model} {size}</p>
      <p className="offer-details-infos">Description : {infos}</p>
      <ul>
        Accéssoires :
        <li>Lampe fournie : {lamps ? 'Oui' : 'Non'}</li>
        <li>Lampe fourni : {helmet ? 'Oui' : 'Non'}</li>
        <li>Anti-vol fourni : {safety_lock ? 'Oui' : 'Non'}</li>
      </ul>
      <p>Dates : du {validity_start_date} au {validity_end_date}</p>
      <button type="button">Réserver cette offre</button>
      <Link to="/offers">Retour aux offres</Link>
    </div>
  );
};
OfferDetails.propTypes = {
  offerDetail: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    infos: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
    validity_start_date: PropTypes.string.isRequired,
    validity_end_date: PropTypes.string.isRequired,
    helmet: PropTypes.bool.isRequired,
    lamps: PropTypes.bool.isRequired,
    safety_lock: PropTypes.bool.isRequired,

  })).isRequired,
};
export default OfferDetails;
