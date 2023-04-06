import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import { createToken } from '../auth/authFuncs';
import Users from '../database/models/users';
import ILogin from '../interfaces/Ilogin';
import ApiError from '../shared/api.errors';
import validations from './validations/validations';
import IRequest from '../interfaces/IRequest';

export default class UserService {
  private model: ModelStatic<Users> = Users ;

  async login(userData: ILogin) {
    const { email, password } = userData;

    validations.validateLogin(userData);

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new ApiError(401, 'Invalid email or password');

    const token = createToken(email);

    return { token };
  }

  async getRole(email: IRequest) {
    const user = await this.model.findOne({
      where: { email },
      attributes: ['role'] });
    return user;
  }
}
