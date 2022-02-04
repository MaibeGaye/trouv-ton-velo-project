import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { InputLabel, FormControl, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../Context';

const UpdateInfos = ({
  loader,
  showUpdateModal, handleUpdateModal,
  updateInfos,
  updateModalChangeValue,
  updateInputsValues,
}) => {
  const { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Dialog sx={{ textAlign: 'center' }} open={showUpdateModal} onClose={handleUpdateModal}>
        <DialogTitle sx={{ color: '#18B7BE', fontSize: '5ch', textTransform: 'uppercase' }}>Modifier mes informations</DialogTitle>
        <DialogContent>
          { loader && (
          <Box sx={{ width: '50%', margin: 'auto' }}>
            <LinearProgress sx={{ backgroundColor: '#18B7BE' }} />
          </Box>
          )}
          <TextField
            required
            autoFocus
            fullWidth
            margin="dense"
            id="firstname"
            type="text"
            label="Prénom"
            variant="standard"
            onChange={updateModalChangeValue('firstname')}
            helperText={`Prénom: ${user.infos.firstname}`}
            value={updateInputsValues.firstname}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="lastname"
            type="text"
            label="Nom"
            variant="standard"
            onChange={updateModalChangeValue('lastname')}
            helperText={`Nom: ${user.infos.lastname}`}
            value={updateInputsValues.lastname}

          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="text"
            id="username"
            label="Pseudo"
            variant="standard"
            onChange={updateModalChangeValue('username')}
            helperText={`Pseudo: ${user.infos.username}`}
            value={updateInputsValues.username}

          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="email"
            id="email"
            label="Email"
            variant="standard"
            onChange={updateModalChangeValue('email')}
            helperText={`Email: ${user.infos.email}`}
            value={updateInputsValues.email}

          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="address"
            type="text"
            label="Adresse"
            variant="standard"
            onChange={updateModalChangeValue('address')}
            helperText={`Adresse: ${user.infos.address}`}
            value={updateInputsValues.address}

          />
          <TextField
            required
            fullWidth
            margin="dense"
            type="number"
            id="zip_code"
            label="Code Postal"
            variant="standard"
            onChange={updateModalChangeValue('zip_code')}
            helperText={`Code Postal: ${user.infos.zip_code}`}
            value={updateInputsValues.zip_code}

          />
          <FormControl sx={{ width: '50ch', margin: '2ch' }} variant="standard">
            <InputLabel htmlFor="password">
              Mot de passe
            </InputLabel>
            <p>Nouveau MDP</p>
            <Input
              required
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={updateModalChangeValue('password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                )}
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={handleUpdateModal}>Annuler</Button>
          <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={updateInfos}>Valider</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
UpdateInfos.propTypes = {
  loader: PropTypes.bool.isRequired,
  showUpdateModal: PropTypes.bool.isRequired,
  handleUpdateModal: PropTypes.func.isRequired,
  updateInfos: PropTypes.func.isRequired,
  updateModalChangeValue: PropTypes.func.isRequired,
};
export default UpdateInfos;
