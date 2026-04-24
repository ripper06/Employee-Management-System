'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      Employee.hasOne(models.JobDetails,{
        foreignKey : 'employee_id',
        as: 'jobDetails',
        onDelete: 'CASCADE'
      })

      Employee.hasOne(models.EmployeeDetails,{
        foreignKey: 'employee_id',
        as: 'employeeDetails',
        onDelete: 'CASCADE'
      })
    }
  }
  Employee.init({
    id: {
      type : DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type : DataTypes.UUID,
      allowNull: false,
    },
    first_name: {
      type : DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type : DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
         isNumeric: true,
         len: [10, 15]
      }
    },
    date_of_birth: {
      type : DataTypes.DATE
    },
    gender: {
      type : DataTypes.ENUM('MALE','FEMALE','OTHER'),
      allowNull: false,
      defaultValue: 'MALE'
    }
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  });
  return Employee;
};