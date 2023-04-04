import { Request, Router, Response } from 'express';

import MatchesController from '../controllers/match.controller';

const matchRouter = Router();
const matchController = new MatchesController();

matchRouter.get('/', (req: Request, res: Response) =>
  matchController.getAllMatches(req, res));

export default matchRouter;
