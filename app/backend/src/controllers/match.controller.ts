import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

export default class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  async getAllMatches(_req: Request, res: Response) : Promise<void> {
    const allTeams = await this.service.getAllMatches();
    res.status(200).json(allTeams);
  }
}
