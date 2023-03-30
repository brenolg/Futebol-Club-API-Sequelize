import { Request, Response } from 'express';
import TeamsService from '../services';

export default class TeamsController {
  static async getAllTeams(_req: Request, res: Response) {
    const allTeams = await TeamsService.getAllTeams();
    return res.status(200).json(allTeams);
  }
}
