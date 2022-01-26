import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Offer from '../Offer';
import './style.scss';

const Offers = ({ offers, handleChange, searchOffers }) => {
  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <section className="container offers">
      <div className="offers-form">
        <h2 className="offers-form-title">Recherche</h2>
        <div className="offers-form-inputs">
          <div className="offers-form-input">
            <input type="radio" id="ville" name="size" value="ville" onChange={handleChange} />
            <label htmlFor="ville">Ville</label>
            <input type="radio" id="vtt" name="size" value="vtt" onChange={handleChange} />
            <label htmlFor="vtt">Vtt</label>
          </div>
          {/* <div className="offers-form-input">
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
          </div> */}
          <button type="button" className="button-research" onClick={searchOffers}>Rechercher</button>
        </div>
        <div className="test">
          {offers.map((test) => (
            <div className="test-div" key={test.id}>
              <Offer {...test} />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="offers-form">
        <h2 className="offers-form-title">Recherche</h2>
        {/* { spinner && <div className="spinner" />} */}
      {/* <button type="button" className="btn-modal" onClick={handleModal}>X</button>
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
        </div> */}
      {/* <button type="button" className="button-research" onClick={searchOffers}>Rechercher</button>
      </div>

      <div className="test">
        {offers.map((test) => (
          <div className="test-div" key={test.id}>
            <Offer {...test} />
          </div>
        ))}
      </div>
      <button type="button" className="btn" onClick={handleModal}>Faire une recherche</button> */} */}
    </section>
  );
};
export default Offers;
