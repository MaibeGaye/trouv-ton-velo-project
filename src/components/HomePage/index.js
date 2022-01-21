import { Link } from 'react-router-dom';
import './style.scss';

const Home = () => (

  <div className="container home">
    <button type="button" className="home-button">Je souhaite emprunter un vélo</button>
    <button type="button" className="home-button"><Link to="/create">J'ai des vélos à preter</Link></button>
  </div>

);

export default Home;
