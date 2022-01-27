import { Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
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
import '../../styles/index.scss';
import { UserContext } from '../Context';

const App = () => {
  const { user } = useContext(UserContext);
  const [offers, setOffers] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [filteredOffer, setfilteredOffer] = useState([]);
  const [spinner, setSpinner] = useState(false);

  // const handleModal = () => {
  //   setSpinner(!modal);
  // };

  const GetOffersFiltered = (event) => {
    event.preventDefault();
    setSpinner(true);
    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/getAllOffers/',
    })
      .then((res) => {
        setTimeout(() => {
          console.log('Options choisies :', filteredOffer);
          setOffers(res.data);
          setSpinner(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };

  const resetOffers = () => {
    setOffers([]);
  };
  const handleChange = (event) => {
    setfilteredOffer({
      ...filteredOffer,
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
              offers={offers}
              searchOffers={GetOffersFiltered}
              handleChange={handleChange}
              displayLoader={spinner}
              reset={resetOffers}
            />
)}
        />
        <Route path="/offer/:id/details" element={<OfferDetails offerDetail={offers} />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
