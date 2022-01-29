import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { InputLabel, FormControl, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

const RegisterModal = ({
  registerHandleChangeValue, showRegisterModal,
  handleRegisterModal, loader,
  registerModalValue, errors,
  handleShowPassword, showPassword,
  createAccount,
}) => (
  <div>
    <Dialog sx={{ textAlign: 'center' }} open={showRegisterModal} onClose={handleRegisterModal}>
      <DialogTitle sx={{ color: '#18B7BE', fontSize: '7ch', textTransform: 'uppercase' }}>Inscription</DialogTitle>
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
          label="Prénom"
          variant="standard"
          value={registerModalValue.firstname}
          onChange={registerHandleChangeValue('firstname')}
        />
        {errors.firstname && <p className="inputs-errors">{errors.firstname}</p>}
        <TextField
            // error={errors.lastname}
          required
          fullWidth
          margin="dense"
          id="lastname"
          label="Nom"
          variant="standard"
          value={registerModalValue.lastname}
          onChange={registerHandleChangeValue('lastname')}
        />
        {errors.lastname && <p className="inputs-errors">{errors.lastname}</p>}
        <TextField
            // error={errors.username}
          required
          fullWidth
          margin="dense"
          id="username"
          label="Pseudo"
          variant="standard"
          value={registerModalValue.username}
          onChange={registerHandleChangeValue('username')}
        />
        {errors.username && <p className="inputs-errors">{errors.username}</p>}
        <TextField
            // error={errors.email}
          required
          fullWidth
          margin="dense"
          type="email"
          id="email"
          label="Email"
          variant="standard"
          value={registerModalValue.email}
          onChange={registerHandleChangeValue('email')}
        />
        {errors.email && <p className="inputs-errors">{errors.email}</p>}
        <TextField
            // error={errors.address}
          required
          fullWidth
          margin="dense"
          id="address"
          label="Adresse"
          variant="standard"
          value={registerModalValue.adress}
          onChange={registerHandleChangeValue('address')}
        />
        {errors.address && <p className="inputs-errors">{errors.address}</p>}
        <TextField
            // error={errors.zip_code}
          required
          fullWidth
          margin="dense"
          type="number"
          id="zip_code"
          label="Code Postal"
          variant="standard"
          value={registerModalValue.zip_code}
          onChange={registerHandleChangeValue('zip_code')}
        />
        {errors.zip_code && <p className="inputs-errors">{errors.zip_code}</p>}
        <FormControl sx={{ width: '50ch', margin: '2ch' }} variant="standard">
          <InputLabel htmlFor="password">
            Mot de passe
          </InputLabel>
          <Input
              // error={errors.password}
            required
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={registerModalValue.password}
            onChange={registerHandleChangeValue('password')}
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
          {errors.password && <p className="inputs-errors">{errors.password}</p>}
        </FormControl>
        <FormControl sx={{ width: '50ch', marginTop: '1ch' }} variant="standard">
          <InputLabel htmlFor="passwordConfirm">
            Confirmer Mot de passe
          </InputLabel>
          <Input
            required
            id="password-confirm"
            type={showPassword ? 'text' : 'password'}
            value={registerModalValue.passwordConfirm}
            onChange={registerHandleChangeValue('passwordConfirm')}
            endAdornment={(
              <InputAdornment position="end" sx={{ display: 'none' }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              )}
          />
          {errors.passwordConfirm && <p className="inputs-errors">{errors.passwordConfirm}</p>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={handleRegisterModal}>Annuler</Button>
        <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={createAccount}>Valider</Button>
      </DialogActions>
    </Dialog>
  </div>
);
RegisterModal.propTypes = {
  registerHandleChangeValue: PropTypes.func.isRequired,
  showRegisterModal: PropTypes.bool.isRequired,
  handleRegisterModal: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  registerModalValue: PropTypes.object.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
  createAccount: PropTypes.func.isRequired,
};
export default RegisterModal;
