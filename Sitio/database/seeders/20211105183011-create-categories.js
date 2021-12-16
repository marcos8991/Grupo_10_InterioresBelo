'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('Categories', [
            {
                name: 'Interiores',
                createdAt: new Date
            },
            {
                name: 'Habitacion',
                createdAt: new Date
            },
            {
                name: 'Oficina',
                createdAt: new Date
            }
        ], {});

    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Categories', null, {});

    }
};
