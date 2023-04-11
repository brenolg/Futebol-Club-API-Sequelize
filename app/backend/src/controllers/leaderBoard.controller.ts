import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  static async getHomeLeaderBoard(_req: Request, res: Response) {
    const homeLeaderBoard = await LeaderBoardService.getHomeLeaderBoard();

    res.status(200).json(homeLeaderBoard);
  }

  static async getAwayLeaderBoard(_req: Request, res: Response) {
    const awayLeaderBoard = await LeaderBoardService.getAwayLeaderBoard();

    res.status(200).json(awayLeaderBoard);
  }
}
