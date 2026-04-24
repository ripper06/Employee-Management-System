'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmployeeDetails', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      employee_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'Employees',
          key: 'id'
          },
          onDelete: 'CASCADE',
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'India'
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergency_contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      marital_status: {
        type: Sequelize.ENUM('SINGLE', 'MARRIED'),
        allowNull: false
      },
      aadhar_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      father_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: true
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmployeeDetails');
  }
};