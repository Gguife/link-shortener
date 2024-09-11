import { Model, DataTypes } from "sequelize";
import sequelize from "../config/conn";
import Url from "./urlModel";

class Click extends Model {}

Click.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    urlId: {
      type: DataTypes.UUID,
      references: {
        model: Url,
        key: 'id'
      },
      allowNull: false
    },
    clickDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    ipAddress:{
      type: DataTypes.STRING(46),
      allowNull: false,
    },
    userAgent:{
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Click',
  }
)

Click.belongsTo(Url, {foreignKey: 'urlId'});
Url.hasMany(Click, {foreignKey: 'urlId'});

export default Click;