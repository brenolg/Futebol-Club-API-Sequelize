import { Router } from 'express';
import teamsController from '../controllers/team.controller';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAllTeams);

export default teamsRouter;
