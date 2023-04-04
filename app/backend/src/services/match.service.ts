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

  async getInProgressMatches(progress : boolean): Promise<Matches[]> {
    const allMatches = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'awayTeam',
      }, {
        model: Teams,
        as: 'homeTeam',
      }],
      where: { inProgress: progress },
    });
    return allMatches;
  }

  async finishMatch(id: number) {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
