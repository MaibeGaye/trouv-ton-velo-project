/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import './style.scss';
import OffersDisplay from './OffersDisplay';

const Offers = ({
  offers, handleChange,
  searchOffers, reset,
  displayLoader,
  errorSubmitSearchOffer,
  submitSearchOffer,
}) => (
  <section className="container offers">
    <div className="offers-form">
      <h1 className="offers-form-title">Recherche</h1>
      <div className="offers-form-input">
        <label htmlFor="option1">Ville</label>
        <input
          type="tel"
          maxLength={5}
          id="option1"
          name="zip_code"
          onChange={handleChange}
          placeholder="Code Postal"
        />
      </div>
      <div className="offers-form-input">
        <h2>Modèle</h2>
        <div className="test">
          <input
            type="radio"
            id="option2"
            name="size"
            value="Adult"
            onChange={handleChange}
          />
          <label htmlFor="option2">Adulte</label>
          <input
            type="radio"
            id="option3"
            name="size"
            value="Children"
            onChange={handleChange}
          />
          <label htmlFor="option3">Enfant</label>
        </div>
      </div>
      <div className="offers-form-input">
        <h2>Type</h2>
        <div className="test">
          <input
            type="radio"
            id="ville"
            name="model"
            value="City"
            onChange={handleChange}
          />
          <label htmlFor="ville">Ville</label>
          <input
            type="radio"
            id="vtt"
            name="model"
            value="Vtt"
            onChange={handleChange}
          />
          <label htmlFor="vtt">Vtt</label>
        </div>
      </div>
      <div className="offers-form-input">
        <h2>Lumières</h2>
        <div className="test">
          <input
            type="radio"
            id="option4"
            name="lamps"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="option4">Oui</label>
          <input
            type="radio"
            id="option5"
            name="lamps"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="option5">Non</label>
        </div>
      </div>
      <div className="offers-form-input">
        <h2>Anti vol</h2>
        <div className="test">
          <input
            type="radio"
            id="option6"
            name="safety_lock"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="option6">Oui</label>
          <input
            type="radio"
            id="option7"
            name="safety_lock"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="option7">Non</label>
        </div>
      </div>

      <div className="offers-form-input">
        <h2>Casque</h2>
        <div className="test">
          <input
            type="radio"
            id="option8"
            name="helmet"
            value="true"
            onChange={handleChange}
          />
          <label htmlFor="option8">Oui</label>
          <input
            type="radio"
            id="option9"
            name="helmet"
            value="false"
            onChange={handleChange}
          />
          <label htmlFor="option9">Non</label>
        </div>
      </div>
      <div className="offers-form-input-date">
        <label htmlFor="option10">Début</label>
        <input
          type="date"
          id="option10"
          name="validity_start_date"
          onChange={handleChange}
        />
        <label htmlFor="option11">Fin</label>
        <input
          type="date"
          id="option11"
          name="validity_end_date"
          onChange={handleChange}
        />
      </div>

      <div className="offers-form-buttons">
        <button className="offers-form-button" type="submit" onClick={reset}>Reset</button>
        <button className="offers-form-button" type="submit" onClick={searchOffers}>GO !</button>
      </div>
    </div>
    <div className="offer-form-result">
      {displayLoader
        && (
        <div className="spinner" />
        )}

      { !offers ? <p className="offer-form-result-error">Désolé aucune offre ne correspond </p> : <OffersDisplay offers={offers} />}

      { !submitSearchOffer && errorSubmitSearchOffer && (
      <h1 className="offer-form-result-error">Oups nous avons un problème <br />avec votre demande ...</h1>
      )}
    </div>
  </section>
);
Offers.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  searchOffers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  displayLoader: PropTypes.bool.isRequired,
  submitSearchOffer: PropTypes.bool.isRequired,
  errorSubmitSearchOffer: PropTypes.bool.isRequired,
};
export default Offers;
