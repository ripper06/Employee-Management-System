'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobDetails', {
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
        onDelete: 'CASCADE'
      },

      designation: {
        type: Sequelize.STRING,
        allowNull: false
      },

      department: {
        type: Sequelize.STRING,
        allowNull: false
      },

      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      joining_date: {
        type: Sequelize.DATE,
        allowNull: false
      },

      employee_type: {
        type: Sequelize.ENUM('FULLTIME', 'CONTRACT', 'INTERN'),
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },

      past_experience: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      prev_org: {
        type: Sequelize.JSON,
        allowNull: true
      },

      skills: {
        type: Sequelize.JSON,
        allowNull: true
      },

      experience_duration: {
        type: Sequelize.INTEGER,
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

    // Index for performance
    await queryInterface.addIndex('JobDetails', ['employee_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobDetails');
  }
};