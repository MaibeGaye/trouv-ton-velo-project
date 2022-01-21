import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Composants
import Header from '../Header';
import Home from '../HomePage';
import Register from '../Register';
import Offers from '../Offers';
import CreateOffer from '../CreateOffer';
import Details from '../DetailOffers';
import Profile from '../Profile';
import About from '../About';
import Legals from '../Legals';
import Footer from '../Footer';
import NotFound from '../NotFound';

// Style scss
import '../../styles/index.scss';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const toConnect = () => {
    setIsLogged(!isLogged);
  };
  return (
    <div className="app">
      <Header logged={isLogged} connect={toConnect} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="/create" element={<CreateOffer />} />
        <Route path="/detail" element={<Details logged={isLogged} />} />
        <Route path="/dashboard" element={<Profile logged={isLogged} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
