'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Rols',[
       {
        name : 'user',
        rolId : 1,
        createdAt : new Date,
        updatedAt : new Date
       },
       { 
        name : 'admin',
        rolId : 2,
        createdAt : new Date,
        updatedAt : new Date

       }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Rols', null, {});
     
  }
};
