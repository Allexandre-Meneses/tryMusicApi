const { Model, Sequelize } = require("sequelize");
const Bands = require("../models/Bands");

class Events extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            date: Sequelize.DATE,
            time: Sequelize.TIME,
            place: Sequelize.STRING,
            description: Sequelize.STRING,
            tipo: Sequelize.STRING,
            band_id: Sequelize.INTEGER
        }, {
            sequelize,
        });
        return this;
    }
    static associate(models) {
        this.hasMany(models.Bands);
        Bands.belongsTo(models.Events, {foreignKey: "event_id", as: "band"});
    }
}

module.exports = Events;