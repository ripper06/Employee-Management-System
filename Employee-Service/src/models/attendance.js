'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.Employee,{
        foreignKey: 'emp_id',
        as: 'employee',
        onDelete: 'CASCADE'
      })
    }
  }
  Attendance.init({
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    emp_id:{
      type: DataTypes.UUID,
      allowNull: false,
      unique: 'unique_attendance'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: 'unique_attendance' // Ensure unique combination of emp_id and date
    },
    status:{
      type: DataTypes.INTEGER,
      defaultValue: 0, //O for absent, 1 for present
      allowNull: false,
      validate: {
        isIn: [[0, 1]]
      }
    },
    in_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    out_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};