const { Model, Sequelize } = require("sequelize");

class Bands extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_id: Sequelize.INTEGER
      },
      {
        sequelize,
      }
    );
    return this;
  }
  
}
module.exports = Bands;
