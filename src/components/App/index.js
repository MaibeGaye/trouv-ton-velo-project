import { Routes, Route } from 'react-router-dom';

// Composants
import Header from '../Header';
import Footer from '../Footer';
import Home from '../HomePage';
import Offers from '../Offers';
import Register from '../Register';
import NotFound from '../NotFound';

// Style scss
import '../../styles/index.scss';

const App = () => (

  <div className="app">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Offers" element={<Offers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
