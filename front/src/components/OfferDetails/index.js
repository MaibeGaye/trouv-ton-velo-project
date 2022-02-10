import axios from 'axios';
import DayJS from 'react-dayjs';
import { useContext, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { UserContext } from '../Context';

const OfferDetails = ({ offerDetail }) => {
  const { id } = useParams();
  const foundOffer = offerDetail.find((offer) => offer.id === +id);
  const { user } = useContext(UserContext);

  const [reserveOffer, setReserveOffer] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const {
    title, infos, address, helmet, lamps,
    model, photo, safety_lock, size, validity_end_date,
    validity_start_date, zip_code,
  } = foundOffer;

  const reserve = () => {
    setLoader(true);
    setError(false);
    axios({
      method: 'post',
      url: `https://api-apo-velo.herokuapp.com/offer/${id}`,
      data: foundOffer,
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        setTimeout(() => {
          setReserveOffer(true);
          setLoader(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoader(false);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      });
  };

  if (!foundOffer) {
    return <Navigate to="/404" />;
  }

  return (
    <section className="container offer-details">

      { !reserveOffer && !error && (

      <div className="offer-details-page">
        <Box sx={{ width: '50%', margin: '0 auto' }}>
          { loader && <LinearProgress sx={{ margin: '5ch' }} />}
        </Box>
        <img className="offer-details-img" src={photo} alt="vélo de l'annonce" />
        <h1 className="offer-details-title">{title}</h1>
        <div className="offer-details-infos">
          <h2 className="offer-details-infos-title">Description</h2>
          <div className="offer-details-description">{infos}</div>
          <div className="offer-details-address"><p>Adresse : {address} {zip_code}</p></div>
          <div className="offer-details-date"><p>Dates : du  <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p></div>
          <div className="offer-details-accessory-title"><h2>Accessoires</h2></div>
          <div className="offer-details-accessory"><h3>Lampe : </h3> {lamps ? 'Oui' : 'Non'}</div>
          <div className="offer-details-accessory"><h3>Casque : </h3> {helmet ? 'Oui' : 'Non'}</div>
          <div className="offer-details-accessory"><h3>Anti-vol : </h3> {safety_lock ? 'Oui' : 'Non'}</div>
        </div>
        <div className="offer-details-buttons">
          <button type="button" className="offer-details-button"><Link to="/offers">Retour aux offres</Link></button>

          {
            user.logged && <button type="button" className="offer-details-button" onClick={reserve}>Réserver cette offre</button>
          }

        </div>
      </div>
      )}

      { reserveOffer && !error && (

      <div className="reserve-done">
        <h1 className="reserve-done-title">Votre vélo a été reservé </h1>
        <div className="reserve-done-buttons">
          <button type="button" className="reserve-done-button"><Link to="/dashboard">Consulter mon profil</Link></button>
          <button type="button" className="reserve-done-button"><Link to="/offers">Réserver un autre vélo</Link></button>
        </div>
      </div>
      )}

      { !reserveOffer && error && (

      <div className="reserve-error">
        <h1 className="reserve-error-title">Oups une erreur s'est produite</h1>
        <button type="button" className="reserve-error-button"><Link to="/offers">Réessayer</Link></button>
      </div>
      )}

    </section>
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
