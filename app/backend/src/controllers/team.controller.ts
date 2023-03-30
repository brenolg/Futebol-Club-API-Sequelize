import { Request, Response } from 'express';
import TeamsService from '../services';

export default class TeamsController {
  private service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  async getAllTeams(_req: Request, res: Response) : Promise<void> {
    const allTeams = await this.service.getAllTeams();
    res.status(200).json(allTeams);
  }

  async getTeamById(req: Request, res: Response) : Promise<void> {
    const { id } = req.params;

    const team = await this.service.getTeamById(Number(id));
    res.status(200).json(team);
  }
}

// export default class TeamsController {
//   static async getAllTeams(_req: Request, res: Response) {
//     const allTeams = await TeamsService.getAllTeams();
//     return res.status(200).json(allTeams);
//   }
// }

// exemplo de classe static
