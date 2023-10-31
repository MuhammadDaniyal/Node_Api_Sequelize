"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // insert bulk of data to the table
    return queryInterface.bulkInsert("categories", [
      {
        name: "NodeJs",
      },
      {
        name: "VueJS",
      },
      {
        name: "ReactJS",
      },
      {
        name: "ReactNative",
      },
      {
        name: "Laravel",
      },
      {
        name: "Flutter",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories',{},null) // empty object - filter the data
  },
};
