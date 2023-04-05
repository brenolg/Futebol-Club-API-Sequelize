import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

export default class MatchesController {
  private service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const inProgressMatches = await this.service.getInProgressMatches(true);
      return res.status(200).json(inProgressMatches);
    }
    if (inProgress === 'false') {
      const inProgressMatches = await this.service.getInProgressMatches(false);
      return res.status(200).json(inProgressMatches);
    }

    const allMatches = await this.service.getAllMatches();
    res.status(200).json(allMatches);
  }

  async finishMatch(req: Request, res: Response) : Promise<void> {
    const { id } = req.params;

    await this.service.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) : Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Updated' });
  }
}
