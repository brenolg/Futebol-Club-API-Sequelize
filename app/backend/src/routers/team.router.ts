import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/team.controller';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', (req: Request, res: Response) =>
  teamsController.getAllTeams(req, res));

export default teamsRouter;
