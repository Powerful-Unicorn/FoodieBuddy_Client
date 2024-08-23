type UserInformation = {
  email: string;
  password: string;
};

function validateLogin(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format.';
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = 'Password must be between 8 and 20 characters.';
  }
  return errors;
}

export {validateLogin};
