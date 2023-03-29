import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  declare readonly id : number;
  declare teamName : string;
}

Teams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    allowNull: false,
    type: STRING,

  },

}, {
  sequelize: db,
  tableName: 'teams',
  underscored: true,
  timestamps: false,
});
