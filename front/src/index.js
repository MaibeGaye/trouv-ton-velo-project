import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'src/components/App';
import UserProvider from './components/Context';

const target = document.getElementById('root');
const root = createRoot(target);
root.render(
  <StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </StrictMode>,
);
