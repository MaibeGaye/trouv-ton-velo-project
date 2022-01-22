import './style.scss';
import { useContext } from 'react';
import { UserContext } from '../Context';

const Profile = () => {
  const { user } = useContext(UserContext);
  return (

    <div className="container profile">
      <h1>Hello Profil {user.name} </h1>
    </div>
  );
};

export default Profile;
