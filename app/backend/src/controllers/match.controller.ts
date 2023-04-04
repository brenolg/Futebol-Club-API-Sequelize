import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

export default class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response) : Promise<void> {
    const { inProgress } = req.query;

    if (inProgress) {
      const inProgressMatches = await this.service.getInProgressMatches(inProgress as string);
      res.status(200).json(inProgressMatches);
    }
    const allMatches = await this.service.getAllMatches();
    res.status(200).json(allMatches);
  }
}
