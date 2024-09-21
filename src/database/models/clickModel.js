import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/conn.js";
import Url from "./urlModel.js";
import Urls from "./urlModel.js";

class Clicks extends Model {}

Clicks.init(
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
    modelName: 'clicks',
  }
)

Clicks.belongsTo(Urls, {foreignKey: 'urlId'});
Urls.hasMany(Clicks, {foreignKey: 'urlId'});

export default Clicks;