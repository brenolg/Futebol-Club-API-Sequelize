import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async login(req: Request, res: Response) : Promise<void> {
    const token = await this.service.login(req.body);
    res.status(200).json(token);
  }

  async loginRole(req: Request, res: Response) : Promise<void> {
    const userRole = await this.service.getRole(req.body);
    res.status(200).json(userRole);
  }
}
