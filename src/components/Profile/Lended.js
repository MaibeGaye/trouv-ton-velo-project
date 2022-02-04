/* eslint-disable camelcase */
import DayJS from 'react-dayjs';
import { useContext } from 'react';
import './style.scss';

import { UserContext } from '../Context';

const Lended = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {
          user.lende.map(({
            id, title, validity_start_date, validity_end_date,
          }) => (
            <div key={id} className="lended">
              <h1 className="lended-title">{title}</h1>
              <p className="lended-description">Annonce n° {id} : <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p>
            </div>
          ))
        }
    </div>
  );
};

export default Lended;
