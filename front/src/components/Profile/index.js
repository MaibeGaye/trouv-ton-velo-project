/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-alert */
// eslint-disable-next-line no-unused-vars
import './style.scss';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import UpdateInfos from './UpdateModal';
import Lended from './Lended';
import Borrow from './Borrow';
import { UserContext } from '../Context';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [displayInfos, setDisplayInfos] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInputsValues, setUpdateInputsValues] = useState({});

  // Axios GET request to display user's infos

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://trouv-ton-velo-api.onrender.com/dashboard',
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        setUpdateInputsValues(res.data.userData);
        setUser({
          ...user,
          infos: res.data.userData,
          borrow: res.data.borrowedOffers,
          lend: res.data.lendedOffers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // UPDATE FUNCTIONS

  const handleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const updateModalChangeValue = (prop) => (event) => {
    setUpdateInputsValues({ ...updateInputsValues, [prop]: event.target.value });
  };

  // Axios PATCH request to update user's infos

  const updateInfos = () => {
    axios({
      method: 'patch',
      url: 'https://trouv-ton-velo-api.onrender.com/dashboard/edit',
      data: updateInputsValues,
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        setUser({
          ...user,
          infos: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setShowUpdateModal(false);
        }, 2000);
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
      url: 'https://trouv-ton-velo-api.onrender.com/dashboard/delete',
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
                <div className="left-profile-info"><p>Nom :</p><p>{user.infos.lastname}</p></div>
                <div className="left-profile-info"><p>Prénom :</p><p>{user.infos.firstname}</p></div>
                <div className="left-profile-info"><p>Pseudo :</p><p>{user.infos.username}</p></div>
                <div className="left-profile-info"><p>Email :</p><p>{user.infos.email}</p></div>
                <div className="left-profile-info"><p>Adresse :</p><p>{user.infos.address}</p></div>
                <div className="left-profile-info"><p>Code postal :</p><p>{user.infos.zip_code}</p></div>
              </div>
              <div className="left-profile-buttons">
                <button className="left-profile-button" type="button" onClick={handleUpdateModal}>Modifier mes informations</button>
                <button className="left-profile-button" type="button" onClick={firstConfirmDelete}>Supprimer mon compte</button>
              </div>
              <i className="fas fa-arrow-down" />
            </>
          )}
          {
            !displayInfos && (
              <div className="delete-profile">
                <h3 className="left-profile-delete">Êtes-vous sûr de <br /> vouloir supprimer votre compte ?</h3>
                <div className="confirm-buttons">
                  <button type="button" className="confirm-buttons-delete" onClick={confirmDelete}>Oui</button>
                  <button type="button" className="confirm-buttons-cancel" onClick={cancelDelete}>Non</button>
                </div>
              </div>
            )
          }
        </div>
        <div className="right-profile">
          <div className="right-profile-infos-left">
            <h3 className="right-profile-infos-left-title">Vélos empruntés</h3>

            {
              !user.borrow ? <p className="borrow">Je n'ai pas encore emprunté de vélos</p> : <Borrow />
            }

          </div>
          <div className="right-profile-infos-right">
            <h3 className="right-profile-infos-right-title">Mes vélos</h3>

            {
              !user.lend ? <p className="lended">Vous n'avez pas encore proposé de vélos</p> : <Lended />
            }

          </div>
        </div>
      </div>
      )}
    </section>
  );
}

export default Profile;
