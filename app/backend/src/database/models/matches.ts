import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import Teams from './teams';

export default class Matches extends Model {
  declare readonly id : number;
  declare homeTeamId : number;
  declare homeTeamGoals : number;
  declare awayTeamId : number;
  declare awayTeamGoals : number;
  declare inProgress : boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },

}, {
  sequelize: db,
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId' as 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId' as 'awayTeam' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId' as 'homeMatch' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId' as 'awayMatch' });
