import { Request, Response } from 'express';
import UserService from '../services/user.service';
import IRequest from '../interfaces/IRequest';
import ApiError from '../shared/api.errors';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async login(req: Request, res: Response) : Promise<void> {
    const token = await this.service.login(req.body);
    res.status(200).json(token);
  }

  async loginRole(req: IRequest, res: Response) : Promise<Response> {
    const email = req.body.user.data;

    if (email) {
      const userRole = await this.service.getRole(email);
      return res.status(200).json(userRole);
    }
    throw new ApiError(404, 'User not Found');
  }
}
