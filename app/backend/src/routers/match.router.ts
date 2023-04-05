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

matchRouter.patch(
  '/:id',
  userMiddlewares.validateToken,
  (req: Request, res: Response) =>
    matchController.updateMatch(req, res),
);

matchRouter.post(
  '/',
  userMiddlewares.validateToken,
  (req: Request, res: Response) =>
    matchController.createInProgressMatch(req, res),
);

export default matchRouter;
