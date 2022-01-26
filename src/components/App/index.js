import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Home from '../Home';
import Offers from '../Offers';
import CreateOffer from '../CreateOffer';
import Offer from '../Offer';
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

  const [findOffers, setFindOffers] = useState([{
    size: '',
    light: '',
    lock: '',
  }]);

  const searchOffers = (event) => {
    event.preventDefault();
    axios({
      method: 'get',
      url: 'https://api-apo-velo.herokuapp.com/getAllOffers/',
    })
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  };
  const handleChange = (event) => {
    setFindOffers({
      ...findOffers,
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
        <Route path="/offers" element={<Offers offers={offers} searchOffers={searchOffers} handleChange={handleChange} />} />
        {/* <Route path="/offer" element={<Offer />} /> */}
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
