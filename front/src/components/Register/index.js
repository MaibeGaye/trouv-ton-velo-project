import './style.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import { InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Register() {
  // Create states from all inputs by default empty

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to see your password

  const showPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  // Function to see your Confirm password

  const showConfirmPassword = () => {
    setConfirmPassword({
      ...confirmPassword,
      showConfirmPassword: !confirmPassword.showConfirmPassword,
    });
  };

  // Function to submit the form and redirect to home

  const submitRegister = () => {
    axios({
      method: 'get',
      url: 'https://trouv-ton-velo-api.onrender.com/getalloffers',
    })
      .then((res) => {
        console.log(res.data);
        res.data.map((element) => (
          console.log(element)
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container register">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        autoComplete="off"
      >
        <div className="register-inputs">
          <TextField
            required
            id="standard-firstname"
            label="Prénom"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            value={firstname}
            variant="standard"
          />
          <TextField
            id="standard-lastname"
            label="Nom"
            value={lastname}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            variant="standard"
            required
          />
          <TextField
            required={!userName}
            id="standard-username"
            label="Pseudo"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="standard-email"
            label="Adresse email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            variant="standard"
          />
          <TextField
            id="standard-zipcode"
            label="Code Postal"
            type="number"
            value={zipCode}
            onChange={(event) => {
              setZipCode(event.target.value);
            }}
            variant="standard"
            required
          />
          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Mot de passe
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={password.showPassword ? 'text' : 'password'}
              value={password.password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showPassword}
                  >
                    {password.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            )}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-confirm-password">
              Confirmer Mot de passe
            </InputLabel>
            <Input
              id="standard-adornment-confirm-password"
              type={confirmPassword.showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword.password}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showConfirmPassword}
                  >
                    {confirmPassword.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            )}
            />
          </FormControl>
          <button type="submit" className="register-btn" onClick={submitRegister}>Inscription</button>
        </div>
      </Box>
    </div>
  );
}
export default Register;
