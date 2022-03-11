const { Model, Sequelize } = require('sequelize');
const Bands = require('./Bands');

class BandsUser extends Model{
    static associate(models){
        //this.belongsTo(models.User, {foreignKey: "user_id", as: "users"})
        BandsUser.belongsTo(models.Bands, {
            foreignKey: 'band_id',
            onDelete: 'CASCADE'
        });
    }
    static init(sequelize){
        super.init({
            band_id: Sequelize.INTEGER,
            user_id: Sequelize.INTEGER
        },{
            sequelize,
        });
        return this;
    }

}

module.exports = BandsUser;