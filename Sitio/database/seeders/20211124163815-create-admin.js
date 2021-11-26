'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Users',[
       {
        name : 'Admin',
        email : 'admin@Belo.com',
        password : bcrypt.hashSync('123456789',10),
        avatar : 'user-image.jpg',
        rolId : 2,
        createdAt : new Date,
        updatedAt : new Date
       }
     ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
