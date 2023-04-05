import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/Iteam';
import Teams from '../database/models/teams';
import ApiError from '../shared/api.errors';

export default class TeamsService {
  private model: ModelStatic<Teams> = Teams;

  async getAllTeams(): Promise<Teams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async getTeamById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id) as ITeam | null;
    if (!team) throw new ApiError(404, 'Team not found');
    return team;
  }
}

// export default class TeamsService {
//   static async getAllTeams(): Promise<Teams[]> {
//     const allTeams = await Teams.findAll();
//     return allTeams;
//   }
// }
// Exemplo static
