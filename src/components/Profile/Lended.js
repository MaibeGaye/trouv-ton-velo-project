/* eslint-disable camelcase */
import DayJS from 'react-dayjs';
import { useContext } from 'react';
import './style.scss';

import { UserContext } from '../Context';

const Lended = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="right-profile-lended-list">
      {
          user.lende.map(({
            id, title, validity_start_date, validity_end_date,
          }) => (
            <div key={id} className="right-profile-lended">
              <h1 className="right-profile-lended-title">Titre : {title}</h1>
              <p className="right-profile-lended-description">Annonce n° {id}</p>
              <p className="right-profile-lended-date">Du <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p>
            </div>
          ))
        }
    </div>
  );
};

export default Lended;
