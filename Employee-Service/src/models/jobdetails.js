'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobDetails.belongsTo(models.Employee,{
        foreignKey: 'employee_id',
        onDelete: 'CASCADE',
      })
    }
  }
  JobDetails.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    joining_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    employee_type: {
      type: DataTypes.ENUM('FULLTIME', 'CONTRACT', 'INTERN'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    },
    past_experience: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    prev_org: {
      type: DataTypes.JSON,
      allowNull: true
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true
    },
    experience_duration: {
      type: DataTypes.INTEGER, // months
      allowNull: true,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'JobDetails',
    indexes: [
      {
        fields: ['employee_id']
      }
    ]
  });
  return JobDetails;
};