import { Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
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
  const [inputValues, setInputValues] = useState({});
  const [resultOffers, setResultOffers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [submitSearchOffer, setSubmitSearchOffer] = useState(false);
  const [errorSubmitSearchOffer, setErrorSubmitSearchOffer] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // Function useEffect for check if the user is logged and have a token before the first render

  useEffect(() => {
    const backUpToken = localStorage.getItem('token');
    const backUpSession = localStorage.getItem('logged');

    if (backUpSession && backUpToken) {
      const backUpJWT = JSON.parse(backUpToken);
      const backUpLOG = JSON.parse(backUpSession);

      setUser({
        ...user,
        token: backUpJWT,
        logged: backUpLOG,
      });
    }
    else {
      setUser({
        logged: false,
      });
    }
  }, []);

  // Axios POST request to display filtered offers from inputs values

  const getOffersFiltered = (event) => {
    event.preventDefault();
    setResultOffers([]);
    setLoader(true);
    axios({
      method: 'post',
      url: 'https://api-apo-velo.herokuapp.com/offers',
      data: inputValues,
    })
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setResultOffers(res.data);
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
    setInputValues({});
    setResultOffers([]);
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
              offers={resultOffers}
              setOffers={setResultOffers}
              searchOffers={getOffersFiltered}
              handleChange={handleChangeInputValues}
              displayLoader={loader}
              reset={resetOffers}
              errorSubmitSearchOffer={errorSubmitSearchOffer}
              submitSearchOffer={submitSearchOffer}
              inputValues={inputValues}
              setInputValues={setInputValues}
            />
          )}
        />
        <Route path="/offer/:id/details" element={<OfferDetails offerDetail={resultOffers} />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
