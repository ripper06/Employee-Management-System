'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      emp_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 // 0 for absent, 1 for present
      },
      in_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      out_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addConstraint('Attendances', {
      fields: ['emp_id', 'date'],
      type: 'unique',
      name: 'unique_attendance_per_day'
    });
  },

    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Attendances');
    }
};