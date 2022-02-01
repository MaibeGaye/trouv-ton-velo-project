import { Routes, Route } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import Header from '../Header';
import Home from '../Home';
import Offers from '../Offers';
import CreateOffer from '../CreateOffer';
import OfferDetails from '../OfferDetails';
import Profile from '../Profile';
import About from '../About';
import Legals from '../Legals';
import Footer from '../Footer';
import NotFound from '../NotFound';
import { UserContext } from '../Context';

import '../../styles/index.scss';

const App = () => {
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [loader, setLoader] = useState(false);
  const [submitSearchOffer, setSubmitSearchOffer] = useState(false);
  const [errorSubmitSearchOffer, setErrorSubmitSearchOffer] = useState(false);
  const { user } = useContext(UserContext);
  // Axios POST request to display filtered offers from inputs values


  const getOffersFiltered = (event) => {
    setReceivedOffers([]);
    event.preventDefault();
    console.log(inputValues);
    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/offers',
      data: inputValues,
    })
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setReceivedOffers(res.data);
          setSubmitSearchOffer(!submitSearchOffer);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setErrorSubmitSearchOffer(!errorSubmitSearchOffer);
        }, 2000);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      });
  };

  // Function to reset offers from state

  const resetOffers = () => {
    setReceivedOffers([]);
    setSubmitSearchOffer(false);
    setErrorSubmitSearchOffer(false);
  };

  // Function to change inputs values

  const handleChangeInputValues = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  // console.log(user.logged);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/create" element={<CreateOffer />} />
        <Route
          path="/offers"
          element={(
            <Offers
              offers={receivedOffers}
              searchOffers={getOffersFiltered}
              handleChange={handleChangeInputValues}
              displayLoader={loader}
              reset={resetOffers}
              errorSubmitSearchOffer={errorSubmitSearchOffer}
              submitSearchOffer={submitSearchOffer}
            />
          )}
        />
        <Route path="/offer/:id/details" element={<OfferDetails offerDetail={receivedOffers} />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
