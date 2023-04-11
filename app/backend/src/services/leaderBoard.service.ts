import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import homeQuery from './queries/homeLeaderBoard';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import awayQuery from './queries/awayLeaderBoard';

export default class LeaderBoardService {
  static async getHomeLeaderBoard(): Promise<ILeaderBoard[]> {
    const homeLeaderBoard = await sequelize.query(homeQuery, { type: QueryTypes.SELECT });
    return homeLeaderBoard as ILeaderBoard[];
  }

  static async getAwayLeaderBoard(): Promise<ILeaderBoard[]> {
    const awayLeaderBoard = await sequelize.query(awayQuery, { type: QueryTypes.SELECT });
    return awayLeaderBoard as ILeaderBoard[];
  }
}
