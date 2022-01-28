import './style.scss';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  // Axios GET request to display user's infos

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/infos',
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        const backUp = JSON.stringify(res.headers.authorization);
        localStorage.setItem('token', backUp);
        setUser({
          ...user,
          infos: res.data,
          token: res.headers.authorization,
          logged: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!user.logged) {
    return <Navigate to="/" />;
  }

  return (

    <section className="container profile">
      {user.logged && <h1 className="profile-title">Mon profil</h1>}
      {user.logged && (
      <div className="profile-user">
        <div className="left-profile">
          <h2 className="left-profile-title">Mes informations <i className="far fa-address-card" /></h2>
          <div className="left-profile-infos">
            <p>Nom : {user.infos.firstname}</p>
            <p>Prénom : {user.infos.lastname}</p>
            <p>Pseudo : {user.infos.username}</p>
            <p>Email : {user.infos.email}</p>
            <p>Adresse : {user.infos.address}</p>
            <p>Code postal : {user.infos.zip_code}</p>
          </div>
          <button className="left-profile-button" type="button">Modifier mes informations</button>
        </div>
        <div className="right-profile">
          <h2 className="right-profile-title">Récapitulatif <i className="fas fa-bicycle" /></h2>
          <div className="right-profile-infos">
            <h3 className="profile-infos-title">Les vélos que j'ai emprunté</h3>
            <p>Réservation n° : 5 </p>
            <p>Titre de l'annonce : VTT Homme</p>
            <p>Rendre le vélo le : 24/01/2022</p>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};

export default Profile;
