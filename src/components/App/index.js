import { Routes, Route } from 'react-router-dom';

// Composants
import Header from '../Header';
import Footer from '../Footer';
import Home from '../HomePage';
import Offers from '../Offers';
import Register from '../Register';
import About from '../About';
import NotFound from '../NotFound';
import Legals from '../Legals';
import CreateOffer from '../CreateOffer';

// Style scss
import '../../styles/index.scss';

const App = () => (

  <div className="app">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/about" element={<About />} />
      <Route path="/legals" element={<Legals />} />
      <Route path="/create" element={<CreateOffer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
