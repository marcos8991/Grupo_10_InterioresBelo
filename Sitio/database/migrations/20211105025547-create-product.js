'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(600),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      discount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references : {
          model :{
            tableName : 'Sections'
          },
          key : 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        
        type: Sequelize.DATE
      },
      deletedAt: {
        
        type: Sequelize.DATE
      }
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};