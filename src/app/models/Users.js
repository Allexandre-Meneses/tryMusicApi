const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const Bands = require("../models/Bands");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        //band_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 6);
      }
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Bands);
    Bands.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
  checkPassword(password) {
    if (password == this.password_hash) {
      return true;
    }
  }
}

module.exports = User;
