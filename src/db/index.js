const { Sequelize } = require('sequelize');

const dbConfig = require('../config/database');

const Events = require('../app/models/Events');
const Bands = require('../app/models/Bands');
const User = require('../app/models/Users');
const UserBand = require('../app/models/UserBand');
const BandUser = require('../app/models/bandsusers')

const models = [User, Events, Bands, UserBand, BandUser];

class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new Sequelize(dbConfig);

        models.map(model => model.init(this.connection))
            .map((model) => model.associate && model.associate(this.connection.models));
    }
}
module.exports = new Database();
