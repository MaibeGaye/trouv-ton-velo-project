import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import './style.scss';

const offerDetails = ({ offerDetail }) => {
  const { id } = useParams();
  const foundOffer = offerDetail.find((offer) => offer.id == id);

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
      <button type="button">Réserver cette offre</button>
      <Link to="/offers">Retour aux offres</Link>
    </div>
  );
};

export default offerDetails;
