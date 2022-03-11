const { Model, Sequelize } = require('sequelize');

class UserBand extends Model{
    static init(sequelize){
        super.init({

        },{
            sequelize,
        });
        return this;
    }
    static associate(models){
        this.belongsTo(models.User, {foreignKey: "user_id", as: "users"})
        this.belongsTo(models.Events, {foreignKey: "event_id", as: "event"});
    }
}

module.exports = UserBand;