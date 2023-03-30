import { ModelStatic } from 'sequelize';
import Teams from '../database/models/teams';

// export default class TeamsService {
//   static async getAllTeams(): Promise<Teams[]> {
//     const allTeams = await Teams.findAll();
//     return allTeams;
//   }
// }

export default class TeamsService {
  private model: ModelStatic<Teams> = Teams;

  async getAllTeams(): Promise<Teams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
