'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Sections', [
        {
        name: 'Novedades',
        createdAt : new Date
        },
        {
          name: 'Renovate',
          createdAt : new Date
          }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('Sections', null, {});
     
  }
};
