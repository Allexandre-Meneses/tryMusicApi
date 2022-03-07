const { Model, Sequelize } = require("sequelize");

class Bands extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            user_id: Sequelize.INTEGER,
            //evento_id: Sequelize.INTEGER
        }, {
            sequelize,
        });

        return this;
    }
   /* static associate(models) {
        this.belongsTo(models.Musico, { foreignKey: "musico_id", as: "musico" });
        this.belongsTo(models.Eventos, { foreignKey: "evento_id", as: "evento" });
    }*/
}
module.exports = Bands;