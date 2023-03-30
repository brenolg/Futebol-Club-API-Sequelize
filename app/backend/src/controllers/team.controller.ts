import { Request, Response } from 'express';
import TeamsService from '../services';

export default class TeamsController {
  private service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  async getAllTeams(_req: Request, res: Response) {
    const allTeams = await this.service.getAllTeams();
    return res.status(200).json(allTeams);
  }
}

// export default class TeamsController {
//   static async getAllTeams(_req: Request, res: Response) {
//     const allTeams = await TeamsService.getAllTeams();
//     return res.status(200).json(allTeams);
//   }
// }

// exemplo de classe static
