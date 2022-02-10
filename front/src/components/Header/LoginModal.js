import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

const LoginModal = ({
  showLoginModal, handleLoginModal,
  loader, loginHandleChangeValue,
  connectUser,
  responseAPI,
  loginModalValue,
}) => (
  <div>
    <Dialog open={showLoginModal} onClose={handleLoginModal}>
      <DialogTitle sx={{
        color: '#18B7BE', fontSize: '7ch', textTransform: 'uppercase', textAlign: 'center',
      }}
      >Connexion
      </DialogTitle>
      <DialogContent>
        { loader && (
        <Box sx={{ width: '50%', margin: 'auto' }}>
          <LinearProgress />
        </Box>
        )}
        <p className="inputs-errors">{responseAPI}</p>
        <TextField
          required
          autoFocus
          margin="dense"
          id="email"
          label="Adresse email"
          type="email"
          fullWidth
          variant="standard"
          onChange={loginHandleChangeValue}
          value={loginModalValue.email}
        />
        <TextField
          required
          margin="dense"
          id="password"
          label="Mot de passe"
          type="password"
          fullWidth
          variant="standard"
          onChange={loginHandleChangeValue}
          value={loginModalValue.password}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} className="btn-test" variant="outlined" onClick={handleLoginModal}>Annuler</Button>
        <Button sx={{ color: '#18B7BE', border: '1px solid #18B7BE', ':hover': { border: '1px solid #072A40' } }} variant="outlined" onClick={connectUser}>Valider</Button>
      </DialogActions>
    </Dialog>
  </div>
);
LoginModal.propTypes = {
  showLoginModal: PropTypes.bool.isRequired,
  handleLoginModal: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  loginHandleChangeValue: PropTypes.func.isRequired,
  connectUser: PropTypes.func.isRequired,
  responseAPI: PropTypes.string.isRequired,
  loginModalValue: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};
export default LoginModal;
