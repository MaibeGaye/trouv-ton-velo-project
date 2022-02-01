/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import UpdateInfos from './UpdateModal';
import Lended from './Lended';
import Borrow from './Borrow';
import { UserContext } from '../Context';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [displayInfos, setDisplayInfos] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInputsValues, setUpdateInputsValues] = useState({});

  // Axios GET request to display user's infos

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/dashboard',
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        console.log('J\'ai fais une requete en visitant mon profil et mes infos sont :', res.data);
        setUser({
          ...user,
          infos: res.data.userData,
          token: res.headers.authorization,
          borrow: res.data.borrowedOffers,
          lende: res.data.lendedOffers,
        });
      })
      .catch((err) => {
        console.log(err.request.responseText);
      });
  }, []);

  // useEffect(async () => {
  //   try {
  //     const response = await axios({
  //       url: 'https://api-apo-velo.herokuapp.com/dashboard',
  //       method: 'get',
  //       timeout: 3000,
  //       headers: {
  //         Authorization: user.token,
  //       },
  //     });
  //     setUser({
  //       ...user,
  //       infos: response.data.userData,
  //       token: response.headers.authorization,
  //       lende: response.data.lendedOffers,
  //     });
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }, [user.infos]);

  // UPDATE FUNCTIONS

  const handleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const updateModalChangeValue = (prop) => (event) => {
    setUpdateInputsValues({ ...updateInputsValues, [prop]: event.target.value });
  };

  // Axios PATCH request to update user's infos

  const updateInfos = () => {
    console.log('Je fais une requete PATCH pour modifier ces champs :', updateInputsValues);
    axios({
      method: 'patch',
      url: 'https://api-apo-velo.herokuapp.com/dashboard/edit',
      data: updateInputsValues,
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        console.log('Je fais une requete PATCH pour modifier ces champs :', updateInputsValues);
        console.log('La BDD me me retourne ça :', res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  };

  // First confirmation before select Yes or No for delete account

  const firstConfirmDelete = () => {
    setDisplayInfos(false);
  };

  // Cancel the delete component

  const cancelDelete = () => {
    setDisplayInfos(true);
  };

  // Axios DELETE request to delete user's account after 1 confirmation

  const confirmDelete = () => {
    axios({
      method: 'delete',
      url: 'https://api-apo-velo.herokuapp.com/dashboard/delete',
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        setTimeout(() => {
          setUser({
            logged: res.data.logged,
          });
          localStorage.removeItem('logged');
          localStorage.removeItem('token');
          alert('Votre compte a bien été supprimé');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert('Une erreur s\'est produite lors de la suppression de votre compte ... Veuillez réessayer');
      })
      .finally(() => {

      });
  };

  // If the user is not logged, automatically redirect to the home page

  if (!user.logged) {
    return <Navigate to="/" />;
  }

  const renderLended = () => {
    if (user.lende === null) {
      return 'Vous n\'avez pas de vélo ...';
    }
    user.lende.map((element) => (
      <div key={element.id}>
        <h1>{element.infos}</h1>
      </div>
    ));
  };

  return (

    <section className="container profile">
      <UpdateInfos
        updateInputsValues={updateInputsValues}
        showUpdateModal={showUpdateModal}
        handleUpdateModal={handleUpdateModal}
        updateModalChangeValue={updateModalChangeValue}
        updateInfos={updateInfos}
        loader={loader}

      />
      {user.logged && <h1 className="profile-title">Mon profil</h1>}
      {user.logged && (
      <div className="profile-user">
        <div className="left-profile">
          <h2 className="left-profile-title">Mes informations <i className="far fa-address-card" /></h2>

          {displayInfos && (
            <>
              <div className="left-profile-infos">
                <p>Nom: {user.infos.firstname}</p>
                <p>Prénom: {user.infos.lastname}</p>
                <p>Pseudo: {user.infos.username}</p>
                <p>Email: {user.infos.email}</p>
                <p>Adresse: {user.infos.address}</p>
                <p>Code postal: {user.infos.zip_code}</p>
              </div>
              <div className="left-profile-buttons">
                <button className="left-profile-button" type="button" onClick={handleUpdateModal}>Modifier mes informations</button>
                <button className="left-profile-button" type="button" onClick={firstConfirmDelete}>Supprimer mon compte</button>
              </div>
            </>
          )}
          {
            !displayInfos && (
              <div className="delete-profile">
                <h3 className="left-profile-delete">Êtes vous sûrs de <br /> vouloir supprimer votre compte ?</h3>
                <div className="confirm-buttons">
                  <button type="button" className="left-profile-button delete-confirm" onClick={confirmDelete}>Oui</button>
                  <button type="button" className="left-profile-button delete-cancel" onClick={cancelDelete}>Non</button>
                </div>
              </div>
            )
          }
        </div>

        {displayInfos && (
        <div className="right-profile">
          <h2 className="right-profile-title">Récapitulatif <i className="fas fa-bicycle" /></h2>
          <div className="right-profile-infos">
            <h3 className="profile-infos-title">Les vélos que j'ai emprunté</h3>

            {
              !user.borrow ? <p>Je n'ai pas encore emprunté de vélos</p> : <Borrow />
            }

          </div>
          <div className="right-profile-infos">
            <h3 className="profile-infos-title">Mes vélos en circulation</h3>
            {
               !user.lende ? <p>Vous n'avez pas encore proposé de vélos ...</p> : <Lended />
              }
          </div>
        </div>
        )}

      </div>
      )}
    </section>
  );
};

export default Profile;
