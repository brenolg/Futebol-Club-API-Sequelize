import ILogin from '../../interfaces/Ilogin';
import ApiError from '../../shared/api.errors';
import schemas from './schemas';

const validateLogin = (user : ILogin) => {
  const { error } = schemas.loginSchema.validate(user);
  if (!error) {
    return { type: null, message: null,
    };
  }

  throw new ApiError(401, 'Invalid email or password');
};

const validations = { validateLogin };

export default validations;
