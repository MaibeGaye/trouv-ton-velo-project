/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { UserContext } from '../Context';

const Borrow = () => {
  const { user } = useContext(UserContext);
  return (
    <div>

      {
                user.borrow.map(({ title, id, validity_end_date }) => (
                  <div key={id} className="profile-borrow">
                    <h1 className="profile-borrow-title">Titre : {title}</h1>
                    <p className="profile-borrow-id">Réservation n° {id}</p>
                    <p className="profile-borrow-date">A rendre le : {validity_end_date}</p>
                  </div>
                ))
      }

    </div>
  );
};

export default Borrow;
