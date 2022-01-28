// == Import packages : npm / yarn
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/components/App';
import UserProvider from './components/Context';
// == Import : local
// Composants

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)

ReactDOM.render(
  <UserProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </UserProvider>,
  document.getElementById('root'),
);
