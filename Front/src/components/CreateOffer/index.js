import './style.scss';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context';

const CreateOffer = () => {
  const { user } = useContext(UserContext);

  if (!user.infos.id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container create-offer">
      <h1 className="create-offer-title">Creer une annonce</h1>
    </div>
  );
};
export default CreateOffer;
