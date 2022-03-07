const { Model, Sequelize } = require("sequelize");

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
}

module.exports = Events;