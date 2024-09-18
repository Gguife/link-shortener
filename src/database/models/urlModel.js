import { Model, DataTypes } from "sequelize";
import sequelize from "../config/conn.js";


class Url extends Model {}

Url.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    originalUrl: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    hash:{
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Url',
  }
);

export default Url;