'use strict';

let products = 
[
  {
     "id": 1,
     "name": "Silla Esmeralda",
     "description": "Silla esmeralda esta es una descripcion",
     "price": 16000,
     "discount": "hasta 6 cuotas",
     "image": "silla1111.jpg"
  },
  {
     "id": 2,
     "name": "Sofa Monaco",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "image": "silla3-removebg-preview.png",
     "discount": "hasta 12 cuotas"
  },
  {
     "id": 3,
     "name": "Silla Baltic",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "image": "silla4-removebg-preview.png",
     "discount": "hasta 12 cuotas"
  },
  {
     "id": 4,
     "name": "Silla Roma",
     "price": 5023,
     "description": "sofa con capacidad para 3 cuerpo , tiene un ancho de 2m y una altura de 40cm , excelente para disfrutar en familia",
     "image": "silla5-removebg-preview.png",
     "discount": "hasta 12 cuotas"
  },
  {
     "id": 5,
     "name": "Silla de madera",
     "description": "Silla rustica hecha en argentina",
     "price": 16500,
     "discount": "hasta 18 cuotas",
     "image": "img-product-1634088175807.png"
  },
  {
   "id" : 6,
   "name": "Mesa rustik",
   "description": "Mesa de madera ideal para colocar en el patio o jardin del hogar y disfrutar de una tarde de sol.",
   "price": 20000,
   "sectionId": 1,
   "categoryId": 2,
   "image": "img-product-1639105434805",
   "discount": "hasta 3 cuotas",
},
{
   "id" : 7,
   "name": "Cama KENY",
   "description": "Cama keny es ideal para la dos plazas que buscas , comodidad al 100%.",
   "price": 30000,
   "sectionId": 1,
   "categoryId": 2,
   "image": "CAM_LIB_DOB_MAC_1_800x-removebg-preview.png",
   "discount": "hasta 3 cuotas",
},
{
   "id" : 8,
   "name": "Mesa HOUSE",
   "description": "Mesa ideal para el espacio de oficina o tambien para el jardin.",
   "price": 100000,
   "sectionId": 2,
   "categoryId": 1,
   "image": "D_NQ_NP_852651-MLA31114820727_062019-O-removebg-preview.png",
   "discount": "hasta 3 cuotas",
},

{
   "id" : 9,
   "name": "Mesa NQ",
   "description": "Esta mesa es ideal para el mate , buscas tu lugar en el patio para hacer tu cita ES LO QUE BUSCAS!.",
   "price": 7000,
   "sectionId": 2,
   "categoryId": 2,
   "image": "kisspng-coffee-tables-wrought-iron-furniture-5b025228cc8bd3.2802091515268787608378.jpg", "discount": "hasta 6 cuotas",
},
{
   "id" : 10,
   "name": "Cama Fores",
   "description": "Cama Fores. 2 plazas comodidad al 100%",
   "price": 27000,
   "sectionId": 2,
   "categoryId": 2,
   "discount": "hasta 6 cuotas",
   "image": "MHV_014_1-removebg-preview.png",
},
{
   "id" : 11,
   "name": "Mesa Belo",
   "description": "Mesa belo para la oficina es ideal",
   "price": 22000, 
   "sectionId": 2, 
   "categoryId": 3,
   "discount": "hasta 6 cuotas", 
   "image": "mesa-centro-cuadrada-unum-madera-y-hierro-removebg-preview.png", 
},
{
   "id" : 12,
   "name": "Lampara Gaucho",
   "description": "Lampara para la oficina",
   "price": 10000,
   "sectionId": 2,
   "categoryId": 3,
   "discount": "hasta 3 cuotas",
   "image": "gaucho-black-wood-ceiling-pendant-p3470-6191_medium.jpg",
},
]

let images = products.map(product => {
  let image = {
    productId : product.id,
    file : product.image,
    createdAt : new Date
  }
  return image
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Images', 
          images,
     {});
   
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('Images', null, {});
     
  }
};
