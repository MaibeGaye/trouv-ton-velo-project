import PropTypes from 'prop-types';
import Offer from '../Offer';

const OffersDisplay = ({ offers }) => (

  <>
    {
         offers.map((offer) => (
           <div className="offer-container" key={offer.id}>
             <Offer {...offer} />
           </div>
         ))
    }
  </>
);
OffersDisplay.propTypes = {
  offers: PropTypes.array.isRequired,
};
export default OffersDisplay;
