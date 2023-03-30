import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

export default class Users extends Model {
  declare readonly id : number;
  declare username : string;
  declare role : string;
  declare email : string;
  declare password : string;
}

Users.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },

}, {
  sequelize: db,
  tableName: 'users',
  underscored: true,
  timestamps: false,
});
