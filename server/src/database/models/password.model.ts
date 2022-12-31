import { DataTypes, Sequelize } from 'sequelize';

export const passwordDefiner = (sequelize: Sequelize) => {
  sequelize.define('password', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
};
