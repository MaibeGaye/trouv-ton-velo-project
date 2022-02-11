import DayJS from 'react-dayjs';
import axios from 'axios';
import { useContext, useState } from 'react';
import './style.scss';

import { UserContext } from '../Context';

const Lended = () => {
  const { user } = useContext(UserContext);
  const [deleteAnnounce, setDeleteAnnounce] = useState(false);

  const deleteOffer = (id) => {
    setDeleteAnnounce(true);
    axios({
      method: 'delete',
      url: `https://api-apo-velo.herokuapp.com/dashboard/${id}/delete`,
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        // console.log(res)

      })
      .catch((err) => {
        alert('Désolé mais vous ne pouvez pas supprimer votre annonce pour le moment')
        console.log(err)
      })
  };

  return (
    <div className="right-profile-lended-list">

      {
          user.lende.map(({
            id, title, validity_start_date, validity_end_date, currentBorrowerInfos, photo,
          }) => (
            <div key={id} className="right-profile-lended">
              <img className="right-profile-lended-img" src={photo} alt="petit de velo" />
              <h1 className="right-profile-lended-title">Titre : {title}</h1>
              <p className="right-profile-lended-date">Du <DayJS format="DD-MM-YYYY">{validity_start_date}</DayJS> au <DayJS format="DD-MM-YYYY">{validity_end_date}</DayJS></p>
              {
                !currentBorrowerInfos ? <p className="right-profile-lended-borrower">Disponible à la location</p>
                  : currentBorrowerInfos.map(({ username, email }) => (
                    <div key={id + 1}>
                    <p className="right-profile-borrower">Emprunté par : {username}</p>
                    <p  className="right-profile-borrower">Contact : {email}</p>
                    </div>

                  ))
              }

              {
                !currentBorrowerInfos && (
                  <div className="right-profile-buttons">
                    <button type="button" className="right-profile-delete">Modifier</button>
                <button
                  className="right-profile-delete"
                  type="button"
                  onClick={() => {
                    deleteOffer(id);
                  }}
                >Supprimer
                </button>
              </div>
                )
              }
              
            </div>
          ))
          
        }
        
    </div>
  );
};

export default Lended;
