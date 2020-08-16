"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Posts", "userId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Posts", {
      type: "foreign key",
      fields: ["userId"],
      name: "fk_user_id",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([queryInterface.removeColumn("Posts", "userId")]);
  },
};
