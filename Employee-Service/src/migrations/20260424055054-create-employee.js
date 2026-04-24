'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique : true,
        references:{
          model : 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER'),
        allowNull: false,
        defaultValue: 'MALE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // Index for faster queries
    await queryInterface.addIndex('Employees', ['user_id'], {
         name: 'idx_employee_user_id'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};