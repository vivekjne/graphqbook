"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const usersAndChats = await Promise.all([
      queryInterface.sequelize.query("SELECT id from Users;"),
      queryInterface.sequelize.query("SELECT id from Chats;"),
    ]);

    const users = usersAndChats[0][0];
    const chats = usersAndChats[1][0];

    await queryInterface.bulkInsert(
      "Messages",
      [
        {
          userId: users[0].id,
          chatId: chats[0].id,
          text: "This is a test message.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[1].id,
          chatId: chats[0].id,
          text: "This is a second test message.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[1].id,
          chatId: chats[0].id,
          text: "This is a third test message.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
