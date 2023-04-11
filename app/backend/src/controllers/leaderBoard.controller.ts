import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  static async getHomeLeaderBoard(_req: Request, res: Response) {
    const allMatches = await LeaderBoardService.getHomeLeaderBoard();

    res.status(200).json(allMatches);
  }
}
