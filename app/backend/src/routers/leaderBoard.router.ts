import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req: Request, res: Response) =>
  LeaderBoardController.getHomeLeaderBoard(req, res));

export default leaderBoardRouter;
