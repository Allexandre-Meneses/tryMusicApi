const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            band_id: Sequelize.INTEGER
        }, {
            sequelize,
        });
        this.addHook('beforeSave', async(musico) => {
            if (musico.password) {
                musico.password_hash = await bcrypt.hash(musico.password, 6);
            }
        });
        return this;
    }

    /*static associate(models) {
        this.belongsTo(models.Bands, { foreignKey: 'bands_id', as: 'band' })
        return this;
    }*/

    checkPassword(password) {
        if (password == this.password_hash) {
            return true;
        }
    }
}

module.exports = User;