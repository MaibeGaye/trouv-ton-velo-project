const validations = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = 'Le prénom est requis ';
  }
  else if (values.firstname.length < 3) {
    errors.firstname = 'Le prénom doit faire plus de 3 caractères';
  }

  if (!values.username) {
    errors.username = 'Le pseudo est requis';
  }
  else if (values.username.length < 3) {
    errors.username = 'Le pseudo doit faire plus de 3 caractères';
  }

  if (!values.email) {
    errors.email = 'L\'email est requise';
  }
  else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'L\'email est invalide';
  }
  if (!values.lastname) {
    errors.lastname = 'Le nom est requis';
  }
  else if (values.lastname.length < 3) {
    errors.lastname = 'Le nom doit faire plus de 3 caractères';
  }

  if (!values.password) {
    errors.password = 'Un mot de passe est requis';
  }
  else if (values.password.length < 5) {
    errors.password = 'Le mot de passe doit contenir 5 caractères au minimum';
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'La confirmation est requise';
  }
  else if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Les mots de passe ne sont pas identiques';
  }
  if (!values.zip_code) {
    errors.zip_code = 'Le code postal est requis';
  }
  else if (values.zip_code.length !== 5) {
    errors.zip_code = 'Le code postal doit contenir 5 chiffres ';
  }

  if (!values.address) {
    errors.address = 'Une adresse est requise';
  }

  return errors;
};

export default validations;
