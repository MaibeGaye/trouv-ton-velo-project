/* eslint-disable jsx-a11y/label-has-associated-control */
import './style.scss';
import axios from 'axios';
import imageToBase64 from 'image-to-base64/browser';
import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

import { UserContext } from '../Context';

const CreateOffer = () => {
  const { user } = useContext(UserContext);

  const [createOfferValues, setCreateOfferValues] = useState({
    title: '',
    zip_code: '',
    validity_start_date: '',
    validity_end_date: '',
    size: '',
    model: '',
    lamps: false,
    safety_lock: false,
    helmet: false,
    photo: {},

  });
  const [errorInputs, setErrorInputs] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [submitOffer, setSubmitOffer] = useState(false);
  const [errorSubmitOffer, setErrorSubmitOffer] = useState(false);

  const [loader, setLoader] = useState(false);
  const handleChangeInputValues = (event) => {
    setCreateOfferValues({
      ...createOfferValues,
      [event.target.name]: event.target.value,
    });
  };

  const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (() => {
      resolve(fileReader.result);
    });

    fileReader.onerror = ((error) => {
      reject(error);
    });
  });

  const base64convert = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCreateOfferValues({
      ...createOfferValues,
      photo: base64,
    });
  };

  // You have to complet 12 inputs and select
  // correctly the dates for submit the form and post a new offer

  const offerSubmit = () => {
    setLoader(true);
    setErrorDate(false);
    setErrorInputs(false);
    if (createOfferValues.validity_start_date > createOfferValues.validity_end_date) {
      setTimeout(() => {
        setLoader(false);
        setErrorDate(true);
      }, 2000);
    }
    else if (Object.keys(createOfferValues).length < 12) {
      setTimeout(() => {
        setLoader(false);
        setErrorInputs(true);
      }, 2000);
    }
    else if (Object.keys(createOfferValues).length === 12) {
      axios({
        method: 'post',
        url: 'https://api-apo-velo.herokuapp.com/create',
        data: createOfferValues,
        headers: {
          Authorization: user.token,
        },
      })
        .then((res) => {
          
          // console.log(res);
          setTimeout(() => {
            setLoader(false);
            setSubmitOffer(!submitOffer);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            setErrorSubmitOffer(!errorSubmitOffer);
          }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            console.log(user.token)
            setLoader(false);
          }, 2000);
        });
    }
  };
  const repostOfferSucces = () => {
    setSubmitOffer(!submitOffer);
    setCreateOfferValues({});
    setErrorInputs(false);
    setErrorDate(false);
  };
  const respostOfferFailed = () => {
    setErrorSubmitOffer(!errorSubmitOffer);
    setCreateOfferValues({});
    setErrorInputs(false);
    setErrorDate(false);
  };

  // If user are not logged redirect to homePage

  if (!user.logged) {
    return <Navigate to="/" />;
  }

  return (
    <section className="container create-offer">
      { !errorSubmitOffer && !submitOffer && (
      <h1 className="create-offer-title">Créer votre annonce</h1>
      )}
      <Box sx={{ width: '50%', margin: '0 auto' }}>
        { loader && <LinearProgress sx={{ margin: '4ch' }} />}
      </Box>
      {
        errorInputs && <p className="create-offer-title-error">Merci de remplir la totalité des champs <i className="fas fa-exclamation-triangle" /></p>
      }
      {
        errorDate && <p className="create-offer-title-error">La date de fin ne doit pas être inférieur à celle du début <i className="fas fa-exclamation-triangle" /></p>
      }
      { !submitOffer && !errorSubmitOffer && (
        <div className="create-offer-form">
          <div className="create-offer-form-left">
            <div className="create-offer-form-input">
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                maxLength={20}
                id="title"
                name="title"
                placeholder="Titre de votre annonce"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="infos">Description</label>
              <textarea
                type="text"
                id="infos"
                maxLength={50}
                name="infos"
                placeholder="Description"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="zip_code">Ville</label>
              <input
                type="tel"
                maxLength={5}
                id="zip_code"
                name="zip_code"
                placeholder="Code Postal"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Adresse"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="date_start">Début</label>
              <input
                type="date"
                id="date_start"
                name="validity_start_date"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="date_end">Fin</label>
              <input
                type="date"
                id="date_end"
                name="validity_end_date"
                onChange={handleChangeInputValues}
              />
            </div>
            <div className="create-offer-form-input">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept=".jpeg, .png, .jpg"
                onChange={base64convert}
              />
            </div>
          </div>
          <div className="create-offer-form-right">
            <div className="create-offer-radio">
              <div className="create-offer-radio-title">
                <h2>Taille</h2>
              </div>
              <div className="create-offer-radio-input">
                <label htmlFor="option1">Adulte</label>
                <input
                  type="radio"
                  id="option1"
                  name="size"
                  value="Adult"
                  onChange={handleChangeInputValues}
                />
                <label htmlFor="option2">Enfant</label>
                <input
                  type="radio"
                  id="option2"
                  name="size"
                  value="Children"
                  onChange={handleChangeInputValues}
                />
              </div>
            </div>
            <div className="create-offer-radio">
              <div className="create-offer-radio-title">
                <h2>Type</h2>
              </div>
              <div className="create-offer-radio-input">
                <label htmlFor="ville">Ville</label>
                <input
                  type="radio"
                  id="ville"
                  name="model"
                  value="City"
                  onChange={handleChangeInputValues}
                />
                <label htmlFor="vtt">Vtt</label>
                <input
                  type="radio"
                  id="vtt"
                  name="model"
                  value="Vtt"
                  onChange={handleChangeInputValues}
                />
              </div>
            </div>
            <div className="create-offer-radio">
              <div className="create-offer-radio-title">
                <h2>Lumières</h2>
              </div>
              <div className="create-offer-radio-input">
                <label htmlFor="option4">Oui</label>
                <input
                  type="radio"
                  id="option4"
                  name="lamps"
                  value="true"
                  onChange={handleChangeInputValues}
                />
                <label htmlFor="option5">Non</label>
                <input
                  type="radio"
                  id="option5"
                  name="lamps"
                  value="false"
                  onChange={handleChangeInputValues}
                />
              </div>
            </div>
            <div className="create-offer-radio">
              <div className="create-offer-radio-title">
                <h2>Anti vol</h2>
              </div>
              <div className="create-offer-radio-input">
                <label htmlFor="option6">Oui</label>
                <input
                  type="radio"
                  id="option6"
                  name="safety_lock"
                  value="true"
                  onChange={handleChangeInputValues}
                />
                <label htmlFor="option7">Non</label>
                <input
                  type="radio"
                  id="option7"
                  name="safety_lock"
                  value="false"
                  onChange={handleChangeInputValues}
                />
              </div>
            </div>
            <div className="create-offer-radio">
              <div className="create-offer-radio-title">
                <h2>Casque</h2>
              </div>
              <div className="create-offer-radio-input">
                <label htmlFor="option8">Oui</label>
                <input
                  type="radio"
                  id="option8"
                  name="helmet"
                  value="true"
                  onChange={handleChangeInputValues}
                />
                <label htmlFor="option9">Non</label>
                <input
                  type="radio"
                  id="option9"
                  name="helmet"
                  value="false"
                  onChange={handleChangeInputValues}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      { !submitOffer && !errorSubmitOffer && (
        <button type="button" className="create-offer-button publish" onClick={offerSubmit}>Publier</button>
      )}

      { submitOffer && !errorSubmitOffer && (
        <div className="create-offer-done">
          <h2 className="create-offer-done-title">Votre annonce a bien été publiée !</h2>
          <Link to="/dashboard" className="create-offer-done-link">Consulter mon profil</Link>
          <button type="button" className="create-offer-done-button" onClick={repostOfferSucces}>Poster une autre annonce</button>
        </div>
      )}
      { errorSubmitOffer && !submitOffer && (
        <div className="create-offer-done">
          <h2 className="create-offer-done-title">Oups une erreur s'est produite !</h2>
          <button type="button" className="create-offer-done-button" onClick={respostOfferFailed}>Réesayer</button>
        </div>
      )}
    </section>
  );
};
export default CreateOffer;
