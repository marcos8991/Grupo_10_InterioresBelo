'use strict';

let products = [
  {
     
     "name": "Silla Esmeralda",
     "description": "Silla esmeralda esta es una descripcion",
     "price": 16000,
     "sectionId" : 1,
     "discount": "hasta 6 cuotas",
     createdAt : new Date
     
  },
  {
     
     "name": "Sofa Monaco",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "sectionId" : 2,
     "discount": "hasta 12 cuotas",
     createdAt : new Date
  },
  {
     
     "name": "Silla Baltic",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "sectionId" : 2,
     "discount": "hasta 12 cuotas",
     createdAt : new Date
  },
  {
     
     "name": "Silla Roma",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "sectionId" : 1,
     "discount": "hasta 12 cuotas",
     createdAt : new Date
  },
  {
     
     "name": "Silla de madera",
     "description": "Silla rustica hecha en argentina",
     "price": 16500,
     "discount": "hasta 18 cuotas",
     "sectionId" : 1,
     createdAt : new Date
  }
]




module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Products', products,{});
    
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('Products', null, {});
     
  }
};
