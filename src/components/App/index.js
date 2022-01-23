import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../Header';
import Home from '../Home';
import Offers from '../Offers';
import CreateOffer from '../CreateOffer';
import Details from '../DetailOffers';
import Profile from '../Profile';
import About from '../About';
import Legals from '../Legals';
import Footer from '../Footer';
import NotFound from '../NotFound';
import '../../styles/index.scss';
import { UserContext } from '../Context';

const App = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="/create" element={<CreateOffer />} />
        <Route path="/detail" element={<Details />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
