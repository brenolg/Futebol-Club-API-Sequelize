'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'team_name'
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
