import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './style.scss';

const Offers = () => {
  const [modal, setModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [findOffers, setFindOffers] = useState([{
    size: '',
    light: '',
    lock: '',
  }]);

  const handleModal = () => {
    setModal(!modal);
  };
  const searchOffers = (event) => {
    event.preventDefault();
    setSpinner(true);

    console.log('recherche vélo  :', findOffers.size, 'avec une lampe : ', findOffers.light, 'et un anti-vol :', findOffers.lock);

    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/getAllOffers/',
    })
      .then((res) => {
        console.log(res.data);
        setOffers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setSpinner(false);
          handleModal();
        }, 2000);
      });
  };

  const handleChange = (event) => {
    setFindOffers({
      ...findOffers,
      [event.target.name]: event.target.value,
    });
  };

  const ID = useParams();
  const foundOffer = offers.find((element) => element.id === ID);
  console.log(foundOffer);
  return (
    <div className="container offers">
      {modal && (
      <div className="offers-form">
        <h2 className="offers-form-title">Recherche</h2>
        { spinner && <div className="spinner" />}
        <button type="button" className="btn-modal" onClick={handleModal}>X</button>
        <div className="offers-form-inputs">
          <div className="offers-form-input">
            <input type="radio" id="ville" name="size" value="ville" onChange={handleChange} />
            <label htmlFor="ville">Ville</label>
            <input type="radio" id="vtt" name="size" value="vtt" onChange={handleChange} />
            <label htmlFor="vtt">Vtt</label>
          </div>
          <div className="offers-form-input">
            <p>Lumières</p>
            <input type="radio" id="option2" name="light" value onChange={handleChange} />
            <label htmlFor="option2">Oui</label>
            <input type="radio" id="option1" name="light" value="false" onChange={handleChange} />
            <label htmlFor="option1">Non</label>
          </div>
          <div className="offers-form-input">
            <p>Anti vol</p>
            <input type="radio" id="option3" name="lock" value="true" onChange={handleChange} />
            <label htmlFor="option3">Oui</label>
            <input type="radio" id="option4" name="lock" value="false" onChange={handleChange} />
            <label htmlFor="option4">Non</label>
          </div>
        </div>
        <button type="button" className="button-research" onClick={searchOffers}>Rechercher</button>
      </div>
      )}
      {!modal && (
      <div className="test">
        {offers.map(({
          title, id, infos, size,
        }) => (
          <div className="test-div" key={id}>
            <h1 className="test-div-title">{title}</h1>
            <p className="tests">{infos}</p>
            <p className="tests">{size}</p>
            <Link to={`/detail/${id}`}>Détails</Link>
          </div>
        ))}
      </div>
      )}
      {!modal && <button type="button" className="btn" onClick={handleModal}>Faire une recherche</button>}
    </div>
  );
};
export default Offers;
