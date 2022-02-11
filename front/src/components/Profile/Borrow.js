/* eslint-disable camelcase */
import DayJS from 'react-dayjs';
import { useContext } from 'react';
import { UserContext } from '../Context';

const Borrow = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="right-profile-borrow-list">

      {
                user.borrow.map(({
                  title, id, validity_end_date, validity_start_date, currentLenderInfos, photo,
                }) => (
                  <div key={id} className="right-profile-borrow">
                    <img className="right-profile-borrow-img" src={photo} alt="" />
                    <h1 className="right-profile-borrow-title">Titre : {title}</h1>
                    <p className="right-profile-borrow-date">Du <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p>
                    {
                      currentLenderInfos.map(({ username }) => (
                        <p key={username + 1} className="right-profile-borrow-user">Proposé par : {username} </p>
                      ))
                    }
                  </div>
                ))
      }

    </div>
  );
};

export default Borrow;
