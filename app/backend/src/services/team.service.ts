import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/Iteam';
import Teams from '../database/models/teams';

export default class TeamsService {
  private model: ModelStatic<Teams> = Teams;

  async getAllTeams(): Promise<Teams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async getTeamById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id) as ITeam | null;
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
