/* eslint-disable camelcase */
import axios from 'axios';
import DayJS from 'react-dayjs';
import { useContext } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import { UserContext } from '../Context';

const OfferDetails = ({ offerDetail }) => {
  const { id } = useParams();
  const foundOffer = offerDetail.find((offer) => offer.id === +id);
  const { user } = useContext(UserContext);

  if (!foundOffer) {
    return <Navigate to="/404" />;
  }
  const {
    title, infos, address, helmet, lamps,
    model, photo, safety_lock, size, validity_end_date,
    validity_start_date, zip_code,
  } = foundOffer;

  const reserve = () => {
    axios({
      method: 'post',
      url: `https://api-apo-velo.herokuapp.com/offer/${id}`,
      data: foundOffer,
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container offer-details">

      <div className="offer-details-page">
        <h1 className="offer-details-title">{title}</h1>
        <div className="offer-details-infos">Description : {infos}
          <p>Adresse : {address} {zip_code}</p>
          {/* <p>{photo}</p> */}
          <p>Dates : du  <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p>
          <ul>
            <p>Accessoires :</p>
            <li>Lampe fournie : {lamps ? 'Oui' : 'Non'}</li>
            <li>Lampe fourni : {helmet ? 'Oui' : 'Non'}</li>
            <li>Anti-vol fourni : {safety_lock ? 'Oui' : 'Non'}</li>
          </ul>
        </div>
        <button type="button" className="offer-details-button" onClick={reserve}>Réserver cette offre</button>
        <Link to="/offers">Retour aux offres</Link>
      </div>

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
