import { Request, Response } from 'express';
import teamsService from '../services';

const getAllTeams = async (_req : Request, res: Response) => {
  const allTeams = await teamsService.getAllTeams();
  return res.status(200).json(allTeams);
};

const teamsController = { getAllTeams };

export default teamsController;
