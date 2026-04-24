'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeDetails.belongsTo(models.Employee,{
        foreignKey: 'employee_id',
        as: 'employee',
        onDelete: 'CASCADE'
      })
    }
  }
  EmployeeDetails.init({
     id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true   // 1:1 relation
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'India'
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{6}$/   // Indian pincode
      }
    },
    emergency_contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{10}$/  // Indian mobile
      }
    },
    marital_status: {
      type: DataTypes.ENUM('SINGLE', 'MARRIED'),
      allowNull: false,
      defaultValue: 'SINGLE'
    },
    aadhar_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{12}$/   // Aadhaar format
      }
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mother_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'EmployeeDetails',
    timestamps: true,
  });
  return EmployeeDetails;
};