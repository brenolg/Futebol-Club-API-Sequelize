import Teams from '../database/models/teams';

export default class TeamsService {
  static async getAllTeams(): Promise<Teams[]> {
    const allTeams = await Teams.findAll();
    return allTeams;
  }
}
