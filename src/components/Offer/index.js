import './style.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Offer = ({title, infos, id}) =>
  // console.log('toto')
  (
    <div className=" offer">
      <h1>{title}</h1>
      <p>{infos}</p>
      <Link to={`/offer/${id}/details`}>Details</Link>
    </div>
  );
export default Offer;
