import './style.scss';
import DayJS from 'react-dayjs';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import img from '../../assets/offers.jpg';

const Offer = ({
  title, infos, id, photo, validity_start_date, validity_end_date
}) => (
  <div className=" offer">
    <div className="offer-img"><img src={photo} alt="" /></div>
    <h1 className="offer-title">{title}</h1>
    <p className="offer-infos">{infos}</p>
    {/* <p className="offer-date">Du <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p> */}
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
