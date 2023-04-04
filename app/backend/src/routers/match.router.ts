import { Request, Router, Response } from 'express';
import userMiddlewares from '../middlewares/user';
import MatchesController from '../controllers/match.controller';

const matchRouter = Router();
const matchController = new MatchesController();

matchRouter.get('/', (req: Request, res: Response) =>
  matchController.getAllMatches(req, res));

matchRouter.patch(
  '/:id/finish',
  userMiddlewares.validateToken,
  (req: Request, res: Response) =>
    matchController.finishMatch(req, res),
);

export default matchRouter;
