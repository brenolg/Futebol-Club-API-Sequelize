import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IMatch from '../interfaces/IMatch';
import ApiError from '../shared/api.errors';

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

  async createInProgressMatch(matchData: IMatch) {
    const hasHomeId = await Teams.findByPk(matchData.homeTeamId);
    const hasAwayId = await Teams.findByPk(matchData.awayTeamId);

    if (!hasAwayId || !hasHomeId) throw new ApiError(404, 'There is no team with such id!');
    const newMatch = await this.model.create(
      { ...matchData, inProgress: true },
    );

    return newMatch;
  }
}
