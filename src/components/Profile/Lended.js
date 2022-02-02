/* eslint-disable camelcase */
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
              <p className="lended-description">Annonce n° {id} : {validity_start_date} au {validity_end_date}</p>
            </div>
          ))
        }
    </div>
  );
};

export default Lended;
