"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("City", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Province",
          key: "id",
          as: "provinceId",
        }
      },
      name: {
        type: Sequelize.STRING,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("City")
  },
}
