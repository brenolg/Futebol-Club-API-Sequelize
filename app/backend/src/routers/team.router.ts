import { Router } from 'express';
import TeamsController from '../controllers/team.controller';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAllTeams);

export default teamsRouter;
