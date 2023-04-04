import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export default class MatchesService {
  private model: ModelStatic<Matches> = Matches;

  async getAllMatches(): Promise<Matches[]> {
    const allMatches = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'awayTeam',
      }, {
        model: Teams,
        as: 'homeTeam',
      }],
    });
    return allMatches;
  }
}
