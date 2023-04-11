import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import homeQuery from './queries/homeLeaderBoard';
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderBoardService {
  static async getHomeLeaderBoard(): Promise<ILeaderBoard[]> {
    const homeLeaderBoard = await sequelize.query(homeQuery, { type: QueryTypes.SELECT });
    return homeLeaderBoard as ILeaderBoard[];
  }
}
