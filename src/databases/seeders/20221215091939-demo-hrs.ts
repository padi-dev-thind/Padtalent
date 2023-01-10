'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hrs', [
      {
        id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
        name: 'admin',
        password: '"$2b$10$gaob4ggaDYOGh9F3MgBCEOvcFDN7le25hbyM3VKoqveCzU7NSlBX2"', //pass
        email: 'admin@gmail.com',
        role: 'hr',
        company: 'pad',
        logo: 'logo',
        company_industry: 'tech',
        company_size: 40,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'e1725faa-ef59-427d-980e-4d4dc2ee8388',
        name: 'hr2',
        password: '"$2b$10$gaob4ggaDYOGh9F3MgBCEOvcFDN7le25hbyM3VKoqveCzU7NSlBX2"', //pass,
        email: 'hr@2',
        role: 'hr',
        company: 'pad',
        logo: 'logo',
        company_industry: 'tech',
        company_size: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '170a977a-74fc-4c34-abac-d0d4fb176a92',
        name: 'hr3',
        password: '"$2b$10$gaob4ggaDYOGh9F3MgBCEOvcFDN7le25hbyM3VKoqveCzU7NSlBX2"', //pass,
        email: 'hr@3',
        role: 'hr',
        company: ' pad',
        logo: 'logo',
        company_industry: ' tech',
        company_size: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '599fb02d-7f5a-436e-8873-683f70dd606b',
        name: 'hr4',
        password: '"$2b$10$gaob4ggaDYOGh9F3MgBCEOvcFDN7le25hbyM3VKoqveCzU7NSlBX2"', //pass,
        email: 'thind@paditech.com',
        role: 'hr',
        company: 'pad',
        logo: 'logo',
        company_industry: 'tech',
        company_size: 80,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hrs', [
      {
        id: [0, 1, 2, 3, 4],
      },
    ]);
  },
};
