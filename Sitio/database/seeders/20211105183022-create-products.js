'use strict';

let products = [
   {

      "name": "Silla Esmeralda",
      "description": "Silla esmeralda esta es una descripcion",
      "price": 16000,
      "sectionId": 1,
      "categoryId": 3,
      "discount": "hasta 6 cuotas",
      createdAt: new Date

   },
   {

      "name": "Sofa Monaco",
      "price": 5023,
      "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
      "sectionId": 2,
      "categoryId": 1,
      "discount": "hasta 12 cuotas",
      createdAt: new Date
   },
   {
      "name": "Silla Baltic",
      "price": 5023,
      "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
      "sectionId": 2,
      "categoryId": 3,
      "discount": "hasta 12 cuotas",
      createdAt: new Date
   },
   {
      "name": "Silla Roma",
      "price": 5023,
      "categoryId": 2,
      "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
      "sectionId": 1,
      "discount": "hasta 12 cuotas",
      createdAt: new Date
   },
   {
      "name": "Silla de madera",
      "description": "Silla rustica hecha en argentina",
      "price": 16500,
      "categoryId": 2,
      "discount": "hasta 18 cuotas",
      "sectionId": 1,
      createdAt: new Date
   },
   {
      "name": "Mesa rustik",
      "description": "Mesa de madera ideal para colocar en el patio o jardin del hogar y disfrutar de una tarde de sol.",
      "price": 20000,
      "sectionId": 1,
      "categoryId": 2,
      "discount": "hasta 3 cuotas",
      createdAt: new Date
   },
   {
      "name": "Cama KENY",
      "description": "Cama keny es ideal para la dos plazas que buscas , comodidad al 100%.",
      "price": 30000,
      "sectionId": 1,
      "categoryId": 2,
      "discount": "hasta 3 cuotas",
      createdAt: new Date
   },
   {
      "name": "Mesa HOUSE",
      "description": "Mesa ideal para el espacio de oficina o tambien para el jardin.",
      "price": 100000,
      "sectionId": 2,
      "categoryId": 1,
      "discount": "hasta 3 cuotas",
      createdAt: new Date
   },

   {
      "name": "Mesa NQ",
      "description": "Esta mesa es ideal para el mate , buscas tu lugar en el patio para hacer tu cita ES LO QUE BUSCAS!.",
      "price": 7000,
      "sectionId": 2,
      "categoryId": 2,
      "discount": "hasta 6 cuotas",
      createdAt: new Date
   },
   {
      "name": "Cama Fores",
      "description": "Cama Fores. 2 plazas comodidad al 100%",
      "price": 27000,
      "sectionId": 2,
      "categoryId": 2,
      "discount": "hasta 6 cuotas",
      createdAt: new Date
   },
   {
      "name": "Mesa Belo",
      "description": "Mesa belo para la oficina es ideal",
      "price": 22000,
      "sectionId": 2,
      "categoryId": 3,
      "discount": "hasta 6 cuotas",
      createdAt: new Date
   },
   {
      "name": "Lampara Gaucho",
      "description": "Lampara para la oficina",
      "price": 10000,
      "sectionId": 2,
      "categoryId": 3,
      "discount": "hasta 3 cuotas",
      createdAt: new Date
   },
]




module.exports = {
   up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Products', products, {});

   },

   down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Products', null, {});

   }
};
