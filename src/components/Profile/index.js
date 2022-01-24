import './style.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../Context';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [fakeBike, setFakeBike] = useState(0);

  const addBike = () => {
    setFakeBike(fakeBike + 1);
  };

  return (

    <section className="container profile">
      {user.infos.auth && <h1 className="profile-title">Mon profil</h1>}
      {user.infos.auth && (
      <div className="profile-user">
        <div className="left-profile">
          <h2 className="left-profile-title">Mes informations <i className="far fa-address-card" /></h2>
          <div className="left-profile-infos">
            <p>Nom : {user.infos.firstname}</p>
            <p>Prénom : {user.infos.lastname}</p>
            <p>Pseudo : {user.infos.username}</p>
            <p>Email : {user.infos.email}</p>
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
            {fakeBike >= 1 ? <h3 className="profile-infos-title">j'ai {fakeBike} {fakeBike > 1 ? 'vélos' : 'vélo'}</h3> : <h3 className="profile-infos-title">Pas de vélos </h3> }
          </div>
          <button type="button" onClick={addBike}>Ajouter</button>
        </div>
      </div>
      )}
      {!user.infos.auth && (
        <h2 className="profile-title">Merci de se connecter pour pouvoir consulter votre profil</h2>
      )}

    </section>
  );
};

export default Profile;
